# lmdxtech-site

Portfolio + brand site for **LMDx Technologies, LLC**. Big wide type, hard color blocks, warm black.
Started from the mechanics of nexstudio.tech, then made ours. Deliberately NOT the Mach Groove space language.

## Stack
- Static HTML + CSS + ~100 lines of vanilla JS. No build step (matches mach-groove-web).
- Fonts: Syne 800 (display), Archivo (body) — Google Fonts.
- Palette: LMDx brand colors (logo system v3) — navy `#101A34`, gold `#E0A030`, cream `#E8D5B7`, rust `#C84828`, teal `#2A748E` — on warm black `#171210`, plus binary green `#3FA34D`. The old red `#FC3A52` and sky `#62CDFF` stay only where a product card owns them (Beeline placeholder, Project 03's VHS glitch).
- Section stack: hero black → About black → Work cream → Contact navy, separated by ring-stripe bands.

## Local preview
```
python3 -m http.server 4519 --directory .
```

## Structure
- `index.html` — hero → 01 About → 02 Work → 03 Contact (footer lives inside Contact).
- `css/style.css` — tokens at top; `--display` controls every giant headline size.
- `js/main.js` — line reveals (IntersectionObserver), rotating hero adjective, binary-field generator, nav color that follows the section beneath it (`data-nav="light|dark"`), word-by-word About reveal.
- `assets/shush.svg`, `assets/peek.svg`, `assets/giggle.svg` — Google Noto Emoji (Apache 2.0; license in `assets/LICENSE-noto-emoji.txt`). Shushing face on Project 03, peeking face on Project 04, giggle on the last "Click to reveal" line.
- `assets/brand/` — LMDx logo system v3 exports. Only the files the site uses live here; the source zip's README and artwork sources stay out of this public repo.
  - `lmdx-letters*.png` — just "LMDx", cut from the horizontal wordmark, paired with "Technologies" as live Michroma text. Header: LMDx on top, Technologies underneath spread to the same width, one fixed size (30px LMDx) on every screen and scroll position — no swapping or resizing. Footer: the same lockup. Both use `.brand`. Dom's call (2026-11-17): the wordmark file draws "Technologies" too small. Swap back to a single image if a wordmark with a bigger "Technologies" is ever drawn.
  - `lmdx-badge*.png` — full primary badge, hero. Peeks in from the bottom-right corner, about a quarter off-screen, on purpose.
  - `lmdx-rainbow-anim*.png` — the animated rainbow helmet (APNG: sun pulses, gloss sweeps the visor), left of the brand lockup in the header. `lmdx-rainbow*.png` is the still copy, shown when the visitor has "reduce motion" on. Header only — not in the footer.
  - `lmdx-helmet*.png` — helmet icon on `404.html`.
  - `og-image.png` — 1200×630 social share image.
- Root `favicon.ico`, `favicon-16/32.png`, `apple-touch-icon.png` (180), `icon-192.png` — from the plain helmet icon (`icon_A_1024.png`).
- `404.html` — GitHub Pages serves it for any missing URL, so its links use absolute paths.
- Logo rules: never recolor, stretch, crop or re-type a logo; clear space ≥ the height of the small "x" on every side; gold/cream versions never on white.

## Brand notes
- Headline: "[adjective] apps. Real personality." The adjective deck (in `js/main.js`; the first word must match the `#adj` text in `index.html`): Innovative · Audacious · Funky · Extravagant · Soulful · Marvelous · Exceptional / Unique · Remarkable · Efficient · Outstanding · Phenomenal · Stupendous · Delightful / Scalable · Fabulous · Magnificent · Fun · Eclectic · Exquisite · Smooth. 21 words (Dom's number) in three runs of 7, one tech word per run. Keep new words to ones that fit "Extravagant" width or narrower.
- Studio copy says "small operation" — never "solo".
- Footer carries a low-key **Black-owned** badge — present, not shouting.
- Unreleased projects are teased, never named: 03 is a VHS-static card, 04 is a censored mosaic. The repo is public, so real names, descriptions, and screenshots stay out of the markup until launch.
- The ghosted **21** behind the footer is an easter egg (Dom's favorite number). Not explained on the site, on purpose.
