# lmdxtech-site

Portfolio + brand site for **LMDx Technologies, LLC**. Big wide type, hard color blocks, warm black.
Started from the mechanics of nexstudio.tech, then made ours. Deliberately NOT the Mach Groove space language.

## Stack
- Static HTML + CSS + ~100 lines of vanilla JS. No build step (matches mach-groove-web).
- Fonts: Syne 800 (display), Archivo (body) — Google Fonts.
- Palette: warm black `#171210`, cream `#F5EDDF`, navy `#122348`, gold `#F9B248`, red `#FC3A52`, sky `#62CDFF`, binary green `#3FA34D`.
- Section stack: hero black → About black → Work sky → Contact navy, separated by ring-stripe bands.

## Local preview
```
python3 -m http.server 4519 --directory .
```

## Structure
- `index.html` — hero → 01 About → 02 Work → 03 Contact (footer lives inside Contact).
- `css/style.css` — tokens at top; `--display` controls every giant headline size.
- `js/main.js` — line reveals (IntersectionObserver), rotating hero adjective, binary-field generator, nav color that follows the section beneath it (`data-nav="light|dark"`), word-by-word About reveal.
- `assets/lmdx-badge.png` — company badge (source: `~/Downloads/LMDxTech Logo.png`).
- `preview/` — design-option mockups used during exploration. Not linked from the site; safe to delete or exclude from deploy.

## Brand notes
- Headline: "[adjective] apps. Real personality." The adjective deck (in `js/main.js`): Good · Great · Stupendous · Magnificent · Funky · Slick · Soulful.
- Studio copy says "small operation" — never "solo".
- Footer carries low-key **Black-owned** and **Queer-owned** badges — present, not shouting.
- The ghosted **21** behind the footer is an easter egg (Dom's favorite number). Not explained on the site, on purpose.
