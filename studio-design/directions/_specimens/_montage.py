# Regenerate _montage.jpg / _montage.rtl.jpg from the specimen shots: python3 _montage.py
import os, glob
from PIL import Image, ImageDraw, ImageFont
here = os.path.dirname(os.path.abspath(__file__))
slugs = sorted(f[:-5] for f in os.listdir(here) if f.endswith('.html') and not f.startswith('_') and f != 'index.html')
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 15)
COLS, TW, TH, M, G, LAB = 7, 280, 175, 6, 5, 27
rows = -(-len(slugs) // COLS)
for suffix, out in (('.jpg', '_montage.jpg'), ('.rtl.jpg', '_montage.rtl.jpg')):
    W = M * 2 + COLS * TW + (COLS - 1) * G; H = M + rows * (TH + LAB)
    im = Image.new('RGB', (W, H), (25, 25, 27)); d = ImageDraw.Draw(im)
    for i, s in enumerate(slugs):
        x = M + (i % COLS) * (TW + G); y = M + (i // COLS) * (TH + LAB)
        p = os.path.join(here, s + suffix)
        if os.path.exists(p): im.paste(Image.open(p).convert('RGB').resize((TW, TH), Image.LANCZOS), (x, y))
        d.text((x + 2, y + TH + 4), s, font=font, fill=(228, 228, 230))
    im.save(os.path.join(here, out), quality=82)
    print(out, im.size, len(slugs))
