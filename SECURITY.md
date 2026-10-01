# Security policy

studio-design is a Claude skill: Markdown instructions, a small vanilla JS/CSS runtime and a few local development scripts. It has no server, stores no data and needs no API keys.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Report them privately through GitHub: **Security → Report a vulnerability** on this repository. You will get an answer within a few days.

Useful things to include: the file and line, what an attacker could do, and steps to reproduce.

## What counts

- Code in `studio-design/runtime/` that lets page content run unexpected script (XSS) or load code from an unexpected origin.
- Scripts in `studio-design/scripts/` that write outside their output folder or send data anywhere other than the site being checked.
- Instructions in the skill files that would make Claude do something harmful, leak data or run untrusted code.
- Any secret, key or personal data committed to the repository.

## How contributions are handled

- Only the maintainer can merge. Every pull request is reviewed by hand, including changes to Markdown instructions, since the skill's text drives what Claude does.
- Third-party libraries are never bundled. They load from jsDelivr at a pinned version (see [NOTICE.md](NOTICE.md)).
- Secret scanning and push protection are on for this repository.

## Using the skill safely

- Install it from this repository (or a fork you have read), not from re-uploaded copies.
- Read `SKILL.md` before installing, as with any skill: it is plain text and short enough to review.
