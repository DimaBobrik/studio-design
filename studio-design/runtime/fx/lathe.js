/* studio-design · fx/lathe.js — a subject object built in code: a surface of revolution (lathe) rendered live with WebGL2
   ray marching. Vases, bowls, mugs, bottles, jars, drinking glasses, candles, cosmetics bottles, drinks: anything turned
   around one axis. Own code (no third-party shaders). Seeded surface detail, so two objects on a site never look identical.
   Markup:
     <figure class="sd-lathe" data-fx="lathe" data-preset="vase" data-material="glazed-ceramic"
             data-colors="--c-accent,--img-glaze-pool" data-seed="14" data-drag="true" data-label="Turn the vase">
       <img class="sd-lathe__fallback" src="img/vase-000.webp" alt="Ash-glazed vase, front view" width="1000" height="1300">
     </figure>
   The <img> is the static fallback (no WebGL2, reduced-motion first paint, SEO/LCP); render it with scripts/render-stills.mjs.
   Params (data-* on the element)                 type    default              ACF
     data-preset    vase|bowl|mug|cup|bottle|jar|glass|candle   select vase   select
     data-profile   custom radii foot→rim, e.g. "0.12,0.2,0.28,0.3,0.22,0.1,0.1" (height = 1; Catmull-Rom smoothed;
                    overrides the preset)                           text  ""   text (or repeater → joined)
     data-handle    add a mug handle              bool    preset (mug)         true_false
     data-material  glazed-ceramic|matte-clay|glass|metal|plastic   select  glazed-ceramic   select
     data-colors    "body,pool" colours: --token, --img-token or any CSS colour   text  "--c-accent,--c-accent"   text
     data-base      unglazed foot / clay / contents colour          text  --c-surface-2   text
     data-liner     inside colour                                    text  first colour     text
     data-light     key light colour                                 text  oklch(97% .01 80)  text
     data-dip       glaze dip line 0..1 (glazed-ceramic; -1 = fully covered)   number  0.16 ceramic, -1 others   number
     data-tide      tide-line pooling 0..1       number  0       number
     data-body      glaze / coat thickness bias  number  0.3     number
     data-seed      integer (surface variation)  number  1       number
     data-elev      camera elevation (deg)       number  preset  number
     data-angle     start turn (deg)             number  0       number
     data-zoom      1 = whole object; >1 macro   number  1       number
     data-focus     "x,y" macro centre (x −1..1, y 0..1)   text  auto   text
     data-shadow    contact shadow 0..1          number  0.55    number
     data-drag      drag / arrow keys turn it (role=slider)   bool  false   true_false
     data-label     accessible name for the drag slider        text  "Turn the object"   text
     data-auto      auto-turn deg/s (0 = still; paused offscreen; off with reduced motion)   number 0   number
     data-intro     one settle turn on first view (deg)        number  0     number
     data-scroll    scroll-turn: turn with scroll progress through a pinned stage   bool  false   true_false
     data-stage     scroll stage selector (closest match), default the closest <section>   text  "section"  text
     data-length    stage length in viewports (pinned)          number  3     number
     data-degrees   total turn across the stage                  number  180   number
     data-capture   keep the drawing buffer (for stills / toDataURL)   bool  false   —
   Events: "sd:lathe:turn" {detail:{progress, angle}} on the element in scroll mode (for chapter captions).
   API: el.sdLathe = { setAngle(deg), render(), angle, toDataURL(type, q) }.
   Note: data-material="metal" shows visible banding under SwiftShader (headless Chromium / verify screenshots) because of its
   low-precision environment reflection; on real GPUs it is smooth. Judge metal on a device, not in QA screenshots.
   Behaviour: renders on demand (no loop unless data-auto), DPR capped at 1.5, canvas aria-hidden, the loop pauses offscreen
   (IntersectionObserver) and on hidden tabs; WebGL2 missing or shader failure → the <img> stays. Reduced motion: one frame,
   no intro/auto/scroll turn and no pin; drag and keys still work (user-driven). Physical object: the drag direction is the
   same in RTL (not mirrored). Scroll mode uses ScrollTrigger (pin + scrub) when present, else SD.onScroll without a pin. */
(function () {
  'use strict';
  var NAME = 'lathe';
  var store = new WeakMap();

  // radii at evenly spaced heights (foot → rim), object height = 1
  var PRESETS = {
    vase:   { elev: 10, pts: [0.12, 0.155, 0.215, 0.268, 0.300, 0.312, 0.305, 0.285, 0.252, 0.210, 0.168, 0.132, 0.108, 0.098, 0.100, 0.112, 0.132, 0.150] },
    bottle: { elev: 8,  pts: [0.15, 0.19, 0.205, 0.21, 0.212, 0.212, 0.21, 0.205, 0.19, 0.155, 0.10, 0.065, 0.052, 0.050, 0.052, 0.060] },
    mug:    { elev: 14, handle: true, pts: [0.31, 0.345, 0.365, 0.372, 0.374, 0.373, 0.370, 0.366, 0.362, 0.360, 0.362] },
    cup:    { elev: 16, pts: [0.24, 0.27, 0.29, 0.305, 0.318, 0.328, 0.338, 0.346, 0.352, 0.356] },
    bowl:   { elev: 28, pts: [0.40, 0.56, 0.72, 0.84, 0.94, 1.02, 1.08, 1.12, 1.15, 1.17] },
    jar:    { elev: 12, pts: [0.24, 0.31, 0.37, 0.41, 0.43, 0.43, 0.41, 0.37, 0.31, 0.26, 0.235, 0.232, 0.24] },
    glass:  { elev: 14, pts: [0.25, 0.255, 0.26, 0.266, 0.272, 0.278, 0.284, 0.29, 0.296, 0.302] },
    candle: { elev: 16, pts: [0.33, 0.345, 0.35, 0.352, 0.352, 0.352, 0.352, 0.35, 0.345, 0.34] }
  };
  var MATS = { 'glazed-ceramic': 0, 'matte-clay': 1, 'glass': 2, 'metal': 3, 'plastic': 4 };
  var N = 64;
  function sampleProfile(pts) {
    var out = new Float32Array(N), n = pts.length - 1;
    for (var i = 0; i < N; i++) {
      var f = i / (N - 1) * n, k = Math.min(n - 1, Math.floor(f)), t = f - k;
      var p0 = pts[Math.max(0, k - 1)], p1 = pts[k], p2 = pts[k + 1], p3 = pts[Math.min(n, k + 2)];
      var t2 = t * t, t3 = t2 * t; // Catmull-Rom
      out[i] = Math.max(0.01, 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3));
    }
    return out;
  }

  // any CSS colour or --token (oklch, color-mix…) → rgb 0..1 via a 1px canvas
  var cx1 = null;
  function rgb(el, v) {
    if (!v) return [0.5, 0.5, 0.5];
    v = String(v).trim();
    if (v.indexOf('--') === 0) v = getComputedStyle(el).getPropertyValue(v).trim() || '#888';
    if (!cx1) { var c = document.createElement('canvas'); c.width = c.height = 1; cx1 = c.getContext('2d', { willReadFrequently: true }); }
    cx1.clearRect(0, 0, 1, 1); cx1.fillStyle = '#000'; cx1.fillStyle = v; cx1.fillRect(0, 0, 1, 1);
    var d = cx1.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  }

  var VS = '#version 300 es\nin vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var FS = [
    '#version 300 es',
    'precision highp float;',
    'uniform vec2 R; uniform float TURN, ELEV, ZOOM, SEED, DIP, TIDE, SHADOW, HANDLE, VIEWH, BIAS, MAT; uniform vec2 FOCUS;',
    'uniform float P[64]; uniform vec3 G1, G2, LINER, BASE, KEY;',
    'out vec4 o;',
    'float prof(float y){ float f=clamp(y,0.,1.)*63.; int i=int(floor(f)); int j=min(i+1,63); return mix(P[i],P[j],fract(f)); }',
    'float h1(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }',
    'float vn(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.-2.*f);',
    ' return mix(mix(mix(h1(i),h1(i+vec3(1,0,0)),f.x),mix(h1(i+vec3(0,1,0)),h1(i+vec3(1,1,0)),f.x),f.y),',
    '            mix(mix(h1(i+vec3(0,0,1)),h1(i+vec3(1,0,1)),f.x),mix(h1(i+vec3(0,1,1)),h1(i+vec3(1,1,1)),f.x),f.y),f.z); }',
    'float fbm(vec3 p){ float a=.5,s=0.; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=.5; } return s; }',
    // throwing rings only on clay bodies; glass/metal/plastic are smooth
    'float rings(float y){ float k=MAT<1.5?1.:0.; return k*(0.0007*sin(y*118.+SEED)+0.0005*sin(y*47.+SEED*2.3))*(0.4+vn(vec3(y*9.,SEED,1.))); }',
    'float sdf(vec3 p){',
    ' float q=length(p.xz); float r=prof(p.y)+rings(p.y); float th=MAT>1.5&&MAT<2.5?0.022:0.016;',
    ' float w=abs(q-r+th*.5)-th*.5; w=max(w,max(-p.y,p.y-1.)); w-=0.0025;',
    ' float b=max(q-r+0.004,max(-p.y,p.y-0.06));',
    ' float d=min(w,b);',
    ' if(HANDLE>0.5){ float rx=prof(0.55)+0.012; vec3 hp=p-vec3(rx+0.02,0.56,0.); hp.x*=0.78;',
    '  float ht=length(vec2(length(hp.xy)-0.2,hp.z))-0.034; ht=max(ht,-(p.x-rx+0.01)); d=min(d,ht); }',
    ' return d; }',
    'vec3 nrm(vec3 p){ vec2 e=vec2(0.0012,0.); return normalize(vec3(sdf(p+e.xyy)-sdf(p-e.xyy),sdf(p+e.yxy)-sdf(p-e.yxy),sdf(p+e.yyx)-sdf(p-e.yyx))); }',
    'vec3 lin(vec3 c){ return pow(c,vec3(2.2)); }',
    'void main(){',
    ' vec2 uv=(gl_FragCoord.xy-.5*R)/R.y; float pix=VIEWH/ZOOM/R.y;',
    ' float ce=cos(ELEV), se=sin(ELEV);',
    ' vec3 fw=vec3(0.,-se,-ce); vec3 up=vec3(0.,ce,-se); vec3 rt=vec3(1.,0.,0.);',
    ' vec3 tg=vec3(FOCUS.x,FOCUS.y,0.);',
    ' vec3 ro=tg+rt*uv.x*VIEWH/ZOOM+up*uv.y*VIEWH/ZOOM-fw*6.; vec3 rd=fw;',
    ' float ct=cos(TURN), st=sin(TURN); mat2 m=mat2(ct,-st,st,ct);',
    ' ro.xz=m*ro.xz; rd.xz=m*rd.xz;',
    ' vec3 L=normalize(vec3(-0.7,0.55,0.55)); L.xz=m*L.xz; vec3 V=-rd;',
    ' vec3 RL=normalize(vec3(0.85,0.25,-0.45)); RL.xz=m*RL.xz;',
    ' float t=0., dmin=1e9, tmin=0.; bool hit=false;',
    ' for(int i=0;i<180;i++){ vec3 p=ro+rd*t; float d=sdf(p); if(d<dmin){dmin=d;tmin=t;} if(d<0.0003){hit=true;break;} t+=d*0.7; if(t>12.) break; }',
    ' float alpha=1.; if(!hit){ if(dmin<pix*1.2){ t=tmin; alpha=1.-dmin/(pix*1.2); hit=true; } }',
    ' vec4 sh=vec4(0.);',
    ' if(rd.y<0.){ float tp=-ro.y/rd.y; vec3 g=ro+rd*tp; vec2 gw=g.xz; gw=gw*mat2(ct,st,-st,ct); float r0=prof(0.)+0.02;',
    '   float dd=length((gw-vec2(r0*0.45,-r0*0.1))/vec2(1.7,1.)); float sk=MAT>1.5&&MAT<2.5?0.45:1.;',
    '   sh=vec4(0.,0.,0.,SHADOW*sk*(1.-smoothstep(r0*0.4,r0*1.8,dd))); }',
    ' if(!hit){ o=sh; return; }',
    ' vec3 p=ro+rd*t; vec3 n=nrm(p); float q=length(p.xz); float r=prof(p.y);',
    ' bool inner = (q < r-0.008 && p.y>0.03 && dot(n,vec3(p.x,0.,p.z))<0.) || (p.y<0.07 && p.y>0.02 && n.y>0.6 && q<r-0.02);',
    ' float th=atan(p.x,p.z); vec3 cyl=vec3(cos(th),sin(th),p.y*3.)*2.2+SEED;',
    ' vec3 key=lin(KEY); vec3 H=normalize(L+V); float ndh=max(dot(n,H),0.); float fres=pow(1.-max(dot(n,V),0.),3.);',
    ' float dl=dot(n,L); float dif=pow(max(dl*0.92+0.08,0.),1.35);',
    ' float ao=1.; if(inner) ao=mix(0.12,0.85,smoothstep(0.05,1.,p.y)); ao*=mix(0.5,1.,smoothstep(0.,0.14,p.y));',
    ' float spot=mix(0.72,1.08,smoothstep(0.,1.,p.y));',
    ' float rim=pow(max(dot(n,RL),0.),2.5)*pow(1.-max(dot(n,V),0.),1.5)*0.55;',
    ' vec3 col; float a=alpha;',
    ' if(MAT<0.5){',               // glazed ceramic: dip line, runs, pooling, tide lines, speckle
    '  float drip=0.14*pow(vn(vec3(cos(th)*5.,sin(th)*5.,SEED)),5.)+0.05*pow(vn(vec3(cos(th)*11.,sin(th)*11.,SEED+3.)),3.);',
    '  float dip=DIP+0.02*(vn(cyl*1.7)-.5)-drip;',
    '  float glazed=inner?1.:smoothstep(dip-0.003,dip+0.003,p.y);',
    '  vec3 runs=vec3(cos(th)*9.,sin(th)*9.,p.y*1.4+SEED);',
    '  float thick=BIAS+0.45*fbm(runs)+0.2*fbm(cyl*1.1)-0.1; thick+=0.6*smoothstep(0.08,0.,p.y-dip);',
    '  float tw=fract(p.y*3.1+0.05*fbm(cyl*1.2)+SEED*0.13)-.5; float tide=tw>0.?exp(-tw*tw*500.):exp(tw*5.)*smoothstep(0.35,0.75,fbm(runs*1.9+2.))*1.1;',
    '  thick+=TIDE*0.7*tide; thick-=0.55*smoothstep(0.95,1.0,p.y);',
    '  if(inner) thick=0.45+0.3*fbm(cyl*1.5)+0.6*smoothstep(0.35,0.05,p.y);',
    '  thick=clamp(thick,0.,1.2);',
    '  vec3 clay=lin(BASE)*(0.78+0.35*fbm(p*38.)); float speck=smoothstep(0.8,0.84,vn(p*140.+SEED)); clay=mix(clay,clay*0.3,speck);',
    '  vec3 thin=mix(lin(G1),lin(BASE),0.3); vec3 gl=mix(thin,lin(G1),smoothstep(0.15,0.45,thick)); gl=mix(gl,lin(G2),smoothstep(0.55,1.1,thick));',
    '  gl=mix(gl,gl*0.5,0.6*speck*(1.-smoothstep(0.3,0.8,thick)));',
    '  if(inner){ vec3 li=lin(LINER); gl=mix(mix(li,lin(G2),0.25),mix(li,lin(G2),0.8),smoothstep(0.6,1.1,thick)); }',
    '  vec3 alb=mix(clay,gl,glazed); float gloss=glazed*(0.35+0.65*smoothstep(0.2,0.9,thick));',
    '  float spec=pow(ndh,90.)*1.6*gloss+pow(ndh,14.)*0.06*gloss;',
    '  col=alb*(key*dif*1.35*spot+vec3(0.016,0.012,0.011))*ao+key*spec*ao*spot+alb*key*rim*ao*(0.6+0.4*gloss);',
    ' } else if(MAT<1.5){',        // matte clay: bisque, speckle, rings, no gloss
    '  vec3 alb=mix(lin(G1),lin(BASE),0.35*fbm(cyl*2.))*(0.8+0.3*fbm(p*30.)); float speck=smoothstep(0.82,0.86,vn(p*150.+SEED)); alb=mix(alb,alb*0.35,speck);',
    '  if(inner) alb=lin(LINER)*(0.8+0.2*fbm(p*20.));',
    '  col=alb*(key*dif*1.3*spot+vec3(0.02))*ao+alb*key*rim*ao*0.5+key*pow(ndh,8.)*0.02*ao;',
    ' } else if(MAT<2.5){',        // glass: tinted, fresnel-driven opacity, sharp highlights, contents (BASE) in the lower third
    '  vec3 tint=lin(G1); float fill=smoothstep(DIP+0.01,DIP-0.01,p.y)*step(0.,DIP);',
    '  vec3 body=mix(tint*0.35,lin(BASE),fill*0.9);',
    '  float spec=pow(ndh,160.)*2.2+pow(ndh,24.)*0.12;',
    '  float edge=smoothstep(0.55,1.,fres);',
    '  col=body*(0.35+0.65*dif)*ao+key*spec+mix(tint,key,0.5)*edge*0.6+key*rim*0.4;',
    '  a=alpha*clamp(0.22+0.7*edge+0.55*fill+spec*0.5,0.,1.);',
    ' } else if(MAT<3.5){',        // metal: studio environment bands in the reflection
    '  vec3 rf=reflect(rd,n); float band=smoothstep(-0.15,0.55,rf.y)+0.35*smoothstep(0.92,1.,sin(atan(rf.x,rf.z)*3.+SEED));',
    '  vec3 env=mix(vec3(0.03),key,clamp(band,0.,1.));',
    '  vec3 base=lin(G1); col=base*env*ao*1.2+key*pow(ndh,70.)*1.4*ao+base*0.04;',
    '  col=mix(col,col*mix(0.9,1.1,fbm(vec3(th*20.,p.y*2.,SEED))),0.5);',
    ' } else {',                   // plastic: smooth diffuse + soft clear-coat highlight
    '  vec3 alb=lin(G1); if(inner) alb=lin(LINER);',
    '  col=alb*(key*dif*1.25*spot+vec3(0.03))*ao+key*(pow(ndh,40.)*0.5+pow(ndh,8.)*0.04)*ao+alb*key*rim*ao*0.5;',
    ' }',
    ' col=col/(1.+col*0.3); col=pow(col,vec3(1./2.2));',
    ' vec4 obj=vec4(col*a,a);',
    ' o=obj+sh*(1.-a);',
    '}'
  ].join('\n');

  function compile(gl, type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [] }; store.set(el, st);
    if (!el.classList.contains('sd-lathe')) { el.classList.add('sd-lathe'); st.addedClass = true; }
    var preset = PRESETS[SD.data(el, 'preset', 'vase')] || PRESETS.vase;
    var custom = String(SD.data(el, 'profile', '') || '').split(/[,\s|]+/).map(parseFloat).filter(function (v) { return !isNaN(v); });
    var pts = custom.length >= 3 ? custom : preset.pts;
    var handle = SD.data(el, 'handle', !!preset.handle && custom.length < 3);
    var matName = SD.data(el, 'material', 'glazed-ceramic'), mat = MATS[matName] != null ? MATS[matName] : 0;

    var canvas = document.createElement('canvas');
    canvas.className = 'sd-lathe__canvas'; canvas.setAttribute('aria-hidden', 'true');
    var gl = canvas.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false, preserveDrawingBuffer: !!SD.data(el, 'capture', false) });
    if (!gl) { el.classList.add('is-fallback'); return; }
    var prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS)); gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (e) { if (window.console) console.warn('[lathe]', e.message); el.classList.add('is-fallback'); return; }
    el.appendChild(canvas); st.canvas = canvas; st.gl = gl;
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(prog);
    var U = function (n) { return gl.getUniformLocation(prog, n); };
    var colors = String(SD.data(el, 'colors', '--c-accent,--c-accent')).split(/,(?![^(]*\))/);
    var prof = sampleProfile(pts), maxR = 0; for (var i = 0; i < N; i++) maxR = Math.max(maxR, prof[i]);
    gl.uniform1fv(U('P'), prof);
    function setColours() {
      gl.uniform3fv(U('G1'), rgb(el, colors[0])); gl.uniform3fv(U('G2'), rgb(el, colors[1] || colors[0]));
      gl.uniform3fv(U('LINER'), rgb(el, SD.data(el, 'liner', colors[0])));
      gl.uniform3fv(U('BASE'), rgb(el, SD.data(el, 'base', '--c-surface-2')));
      gl.uniform3fv(U('KEY'), rgb(el, SD.data(el, 'light', 'oklch(97% 0.01 80)')));
    }
    setColours();
    var elev = SD.data(el, 'elev', preset.elev) * Math.PI / 180;
    gl.uniform1f(U('ELEV'), elev); gl.uniform1f(U('SEED'), SD.data(el, 'seed', 1)); gl.uniform1f(U('MAT'), mat);
    gl.uniform1f(U('DIP'), SD.data(el, 'dip', mat === 0 ? 0.16 : -1)); gl.uniform1f(U('BIAS'), SD.data(el, 'body', 0.3)); gl.uniform1f(U('TIDE'), SD.data(el, 'tide', 0));
    gl.uniform1f(U('SHADOW'), SD.data(el, 'shadow', 0.55)); gl.uniform1f(U('HANDLE'), handle ? 1 : 0);
    gl.uniform1f(U('ZOOM'), SD.data(el, 'zoom', 1));
    var focus = String(SD.data(el, 'focus', '')).split(',').map(parseFloat);
    st.angle = SD.data(el, 'angle', 0);
    var dirty = false, raf = 0;
    function size() {
      var r = el.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      var aspect = w / h, handleW = handle ? 0.3 : 0;
      var needH = 1 + maxR * Math.sin(elev) * 2 + 0.22, needW = (maxR * 2 + handleW) * 1.18;
      gl.uniform1f(U('VIEWH'), Math.max(needH, needW / aspect)); gl.uniform2f(U('R'), w, h);
      var fx = isNaN(focus[0]) ? (handle ? 0.1 : 0) : focus[0], fy = isNaN(focus[1]) ? 0.5 + maxR * Math.sin(elev) * 0.35 : focus[1];
      gl.uniform2f(U('FOCUS'), fx, fy);
      gl.viewport(0, 0, w, h);
    }
    function draw() {
      raf = 0; if (!dirty) return; dirty = false;
      gl.uniform1f(U('TURN'), st.angle * Math.PI / 180);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!st.live) { st.live = true; el.classList.add('is-live'); }
    }
    function request() { dirty = true; if (!raf) raf = requestAnimationFrame(draw); }
    size(); request();
    var ro = new ResizeObserver(function () { size(); request(); }); ro.observe(el); st.off.push(function () { ro.disconnect(); cancelAnimationFrame(raf); });
    // theme switch (tokens changed) → re-read colours
    var mo = new MutationObserver(function () { setColours(); request(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] }); st.off.push(function () { mo.disconnect(); });

    el.sdLathe = {
      setAngle: function (deg) { if (deg === st.angle) return; st.angle = deg; request(); },
      render: function () { dirty = true; draw(); },
      toDataURL: function (type, q) { dirty = true; draw(); return canvas.toDataURL(type || 'image/webp', q || 0.9); },
      get angle() { return st.angle; }
    };
    var reduced = SD.reduced(), g = window.gsap;

    var intro = SD.data(el, 'intro', 0);
    if (intro && !reduced && g) {
      var start = st.angle, proxy = { a: start - intro }; st.angle = proxy.a;
      st.tw = g.to(proxy, { a: start, duration: 2.2, ease: 'expo.out', delay: 0.2, onUpdate: function () { el.sdLathe.setAngle(proxy.a); } });
    }
    // auto-turn loop (paused offscreen and in hidden tabs)
    var auto = SD.data(el, 'auto', 0);
    if (auto && !reduced) {
      var visible = false, last = 0, loop = 0;
      var tick = function (ts) { loop = 0; if (!visible || document.hidden) return; if (last && !st.dragging) el.sdLathe.setAngle(st.angle + auto * Math.min(0.05, (ts - last) / 1000)); last = ts; loop = requestAnimationFrame(tick); };
      var offVis = SD.onVisible ? SD.onVisible(el, function (v) { visible = !!v; last = 0; if (visible && !loop) loop = requestAnimationFrame(tick); }, { threshold: 0 }) : null;
      if (!SD.onVisible) { visible = true; loop = requestAnimationFrame(tick); }
      st.off.push(function () { if (offVis) offVis(); cancelAnimationFrame(loop); });
    }
    // drag / keyboard (E-18)
    if (SD.data(el, 'drag', false)) {
      el.setAttribute('tabindex', '0'); el.setAttribute('role', 'slider');
      el.setAttribute('aria-label', SD.data(el, 'label', 'Turn the object')); el.setAttribute('aria-valuemin', '0'); el.setAttribute('aria-valuemax', '359');
      el.setAttribute('aria-valuetext', '');
      var setAria = function () { var v = Math.round(((st.angle % 360) + 360) % 360); el.setAttribute('aria-valuenow', String(v)); el.setAttribute('aria-valuetext', v + '°'); };
      setAria();
      var down = null;
      var pd = function (e) { down = { x: e.clientX, a: st.angle }; st.dragging = true; el.setPointerCapture(e.pointerId); el.classList.add('is-dragging'); };
      var pm = function (e) { if (!down) return; el.sdLathe.setAngle(down.a - (e.clientX - down.x) * 0.45); setAria(); };
      var pu = function () { down = null; st.dragging = false; el.classList.remove('is-dragging'); };
      var kd = function (e) {
        var step = e.shiftKey ? 45 : 15, k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); el.sdLathe.setAngle(st.angle + ((k === 'ArrowRight' || k === 'ArrowUp') ? step : -step)); setAria(); }
        else if (k === 'Home') { e.preventDefault(); el.sdLathe.setAngle(0); setAria(); }
      };
      el.addEventListener('pointerdown', pd); el.addEventListener('pointermove', pm); el.addEventListener('pointerup', pu); el.addEventListener('pointercancel', pu); el.addEventListener('keydown', kd);
      st.off.push(function () { el.removeEventListener('pointerdown', pd); el.removeEventListener('pointermove', pm); el.removeEventListener('pointerup', pu); el.removeEventListener('pointercancel', pu); el.removeEventListener('keydown', kd);
        ['tabindex', 'role', 'aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-valuetext'].forEach(function (a) { el.removeAttribute(a); }); });
    }
    // scroll-turn through a pinned stage
    if (SD.data(el, 'scroll', false)) {
      var stage = el.closest(SD.data(el, 'stage', 'section')) || el.parentElement;
      var degs = SD.data(el, 'degrees', 180), len = SD.data(el, 'length', 3), a0 = st.angle;
      var emit = function (p) { el.sdLathe.setAngle(a0 + p * degs); el.dispatchEvent(new CustomEvent('sd:lathe:turn', { detail: { progress: p, angle: st.angle } })); };
      if (reduced) { stage.classList.add('sd-lathe-stage', 'is-static'); }
      else if (window.ScrollTrigger) {
        stage.classList.add('sd-lathe-stage', 'is-pinned');
        st.trig = window.ScrollTrigger.create({ trigger: stage, start: 'top top', end: '+=' + Math.round((len - 1) * 100) + '%', pin: true, scrub: 0.4,
          onUpdate: function (self) { emit(self.progress); } });
      } else {
        stage.classList.add('sd-lathe-stage');
        st.off.push(SD.onScroll(function () { var r = stage.getBoundingClientRect(), vh = window.innerHeight;
          emit(Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)))); }));
      }
      st.off.push(function () { if (st.trig) st.trig.kill(true); stage.classList.remove('sd-lathe-stage', 'is-pinned', 'is-static'); });
    }
  }
  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); }); if (st.tw) st.tw.kill();
    if (st.canvas) { var ext = st.gl && st.gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); st.canvas.remove(); }
    el.classList.remove('is-live', 'is-dragging', 'is-fallback'); if (st.addedClass) el.classList.remove('sd-lathe'); delete el.sdLathe; store.delete(el);
  }
  var mod = { init: init, destroy: destroy, presets: PRESETS };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
