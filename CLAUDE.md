# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## What this is

A one-page static marketing/menu site for **CABELKI Crêpes**, a crêpe shop in Mexico. It is plain HTML, CSS and one tiny vanilla-JS file with no frameworks, no build step, no package manager and no tests. The remote is `git@github.com:mgalicias/cabelki.git`, and the site is meant to be served as-is (GitHub Pages from `main` / root, or Netlify/Vercel).

The look is the "champagne & blush noir" redesign (dark chocolate, champagne hairlines, rose accents; light cream when the visitor prefers a light scheme). An earlier design (`site-header`, `product-card`, `feature-card`, scroll-reveal JS) was removed; it lives in git history (e.g. `adae240`).

- `index.html`: all content. Every menu item, price and section lives here.
- `styles.css`: all styling, one file, short comment per block (tokens on `:root`, header, hero, sections, plates, feature, lists, combos, drinks, contact).
- `script.js`: only the mobile hamburger menu (toggle, closes on link tap / Escape / outside tap). `<html>` gets class `js` from an inline script in `<head>`; the mobile dropdown styles are scoped to `.js`, so without JS the nav stays a scrollable row.
- `assets/crepes/`: product photos. `assets/drinks/` and `assets/icons/` are empty placeholders (`.gitkeep`).
- `README.md`: owner-facing guide **in Spanish** (photo naming, adding a flavor, font swaps, deploy). Keep it in sync when you change structure it describes.
- `.old/`: git-ignored snapshot of an earlier version. Don't edit it or use it as a reference.

## Running locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening `index.html` directly also works.

## Language and content

- All user-facing copy is **Spanish (es-MX)**. Code comments are in English. CSS token comments are mixed (Spanish color names).
- Prices are `$NN` in Mexican pesos, with a small `MXN` label on menu cards and feature cards (not in the `.menu-list` lists).
- Product names are often English ("Red Velvet Berry", "Banana Bliss") while descriptions are Spanish. Keep that convention.

## Page structure (section order in `index.html`)

`#inicio` (hero) → `#temporada` (seasonal, removable) → `#signature` → `#dulces` → `#saladas` → `#gusto` (Crêpe al Gusto) → `#toppings` (Extra Toppings) → `#fresas` (Fresas con Crema + its toppings) → `#combos` (hidden) → `#bebidas` (hidden) → `#contacto` → footer.

The header nav (`header.bar > nav#primaryNav`, a hamburger dropdown below 760px) links to `#temporada`, `#signature`, `#dulces`, `#saladas`, `#gusto`, `#fresas` and `#contacto`. `#combos` and `#bebidas` are commented out together with their nav links. `#toppings` is not in the nav.

Sections alternate backgrounds: `section.alt > .wrap` (tinted, full-bleed) and plain `.wrap > section`. Each repeats the same pattern: `div.head` (`p.eyebrow`, `h2`, `div.rule > span`) → content. Copy an existing section's markup instead of inventing a new one. There is no scroll-reveal JS.

## Component patterns

- **Plate** (Signature/Dulces/Saladas): `article.plate` > `.ph` > `img` + optional `span.tag`, then `.pbody` with `h3`, `p.d` and `p.price.num` (`$NN<small>MXN</small>`). Grids are `.grid.g2` or `.grid.g4`.
- **Feature** (Crêpe al Gusto, Fresas con Crema, seasonal crêpe): `.feature` (`.flip` swaps the image side) with `.fi` (image) and `.fb` (body). Choices are `ul.chips` inside `.pick` (labels `.lab`, separator `.plus`). It is informational only: nothing is selectable.
- **Leader-dot list**: `ul.menu-list` > `li` > `<span>name</span><span class="pr">$NN</span>`; add `.cols` for two columns. Extra Toppings (`#toppings`) and the list under Fresas con Crema are **separate hard-coded lists**, so a price change usually has to be made in both.
- **Seasonal crêpe** (`#temporada`): `section.alt.season` with an `article.feature.season-card`. It is wrapped in `<!-- SEASON START -->` / `<!-- SEASON END -->` and its nav link in `<!-- SEASON NAV -->` / `<!-- /SEASON NAV -->`. To end the season, comment out both blocks (select the lines, Ctrl+/). Never nest a real HTML comment inside those blocks. The photo is `assets/crepes/crepa-de-temporada.png`.
- **Hidden sections** (Combos, Bebidas): kept as one big HTML comment between `COMBOS START`/`COMBOS END` (same for BEBIDAS). The markup inside uses `.combo` cards and `.house` + `.menu-list` for drinks. Don't put `--` or nested comments inside.

### Image fallback convention

Every product `<img>` below the hero carries an inline handler:

```html
onerror="this.style.display='none'; this.parentElement.classList.add('no-image')"
```

When the image is missing, `.ph.no-image` / `.fi.no-image` show a plain gradient instead. Keep this handler on new images and add `loading="lazy" decoding="async"` below the hero. The `src` extension must match the real file exactly (`.jpg`, `.jpeg` and `.png` are all in use, e.g. `banana-bliss.jpeg`). GitHub Pages is case- and extension-sensitive.

## Styling rules

- Brand colors, fonts and the light-scheme overrides are CSS custom properties on `:root` in `styles.css` (`--bg`, `--bg-2`, `--plate`, `--fg`, `--muted`, `--gold`, `--rose`, `--line`, `--glow`). Use the tokens rather than hard-coded hex values. The light palette is defined twice (`prefers-color-scheme: light` and `[data-theme="light"]`); change both.
- Fonts are Cormorant Garamond (display) and Lato (body), loaded through the Google Fonts `<link>` in `<head>`. If you change a font, change the `<link>` **and** `--font-display`/`--font-body` together.
- Breakpoints are few: `820px` (hero), `760px` (header, feature), `640px` (two-column lists).
- Accessibility is deliberate: skip link, visible focus, `prefers-reduced-motion`. Mark decorative SVGs `aria-hidden="true"`.

## External links

The WhatsApp order link (`wa.me/525550716370?text=…`, URL-encoded message), Instagram (`@cabelki_crepes`) and Facebook URLs each appear once, in the `#contacto` CTA (the footer carries no links).

## Known quirks

- `hero-crepe.png` and `strawberry-cream.png` are unused duplicates of the `.jpeg`/`.jpg` files that are referenced.
- Prices render with a small "MXN" label (`<small>MXN</small>`); keep that convention.
