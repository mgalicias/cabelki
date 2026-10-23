# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## What this is

A one-page static marketing/menu site for **CABELKI Crêpes**, a crêpe shop in Mexico. It is plain HTML, CSS and JavaScript with no frameworks, no build step, no package manager and no tests. The remote is `git@github.com:mgalicias/cabelki.git`, and the site is meant to be served as-is (GitHub Pages from `main` / root, or Netlify/Vercel).

- `index.html`: all content. Every menu item, price and section lives here.
- `styles.css`: all styling, organized by the numbered table of contents at the top of the file (1. Tokens … 14. Responsive breakpoints).
- `script.js`: one IIFE in vanilla JS (sticky header, mobile nav, active-link highlighting, reveal-on-scroll, back-to-top, footer year).
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
- Prices are plain `$NN` in Mexican pesos. Don't add "MXN".
- Product names are often English ("Red Velvet Berry", "Banana Bliss") while descriptions are Spanish. Keep that convention.

## Page structure (section order in `index.html`)

`#inicio` (hero) → `#temporada` (seasonal, removable) → `#signature` → `#dulces` → `#saladas` → `#crepe-al-gusto` → Extra Toppings (no `id`, so it is not in the nav) → `#fresas-con-crema` → `#combos` → `#bebidas` → `#contacto` (CTA) → footer.

The nav in the header links only to `#inicio`, `#temporada` (seasonal), `#signature`, `#dulces`, `#saladas`, `#combos`, `#bebidas` and `#contacto`. `script.js` derives the sections for active-link highlighting from the `.nav-link[href^='#']` anchors, so a new section is highlighted only if a nav link points to it.

Each section repeats the same pattern: `section.menu-section` (add `menu-section--alt` for the alternate background) → `.section-inner` → `header.section-head.reveal` (eyebrow, `h2.section-title`, inline-SVG `.ornament`) → content. Copy an existing section's markup instead of inventing a new one.

## Component patterns

- **Product card** (Signature/Dulces/Saladas): `article.product-card.reveal` > `.card-image.placeholder-{signature|sweet|savory}` > `img` + optional `span.card-badge` (`--gold`, `--rose` variants), then `.card-body` with `.card-title`, `.card-desc` and `.card-price`. Grids are `card-grid--2` or `card-grid--3`.
- **Feature card** (Crêpe al Gusto, Fresas con Crema): `.feature-card` with two decorative `.feature-flourish` SVGs, `.feature-image`, `.feature-body`, `.feature-header` (title + `.feature-price-badge`), optional `.feature-select-label` + `ul.toppings-grid`, and `.feature-note`. It is informational only: nothing is selectable.
- **Toppings list**: `ul.toppings-grid` > `li.topping-row` > `<span>name</span>` plus an optional `<span class="topping-price">`. The Extra Toppings section and the list under Fresas con Crema are **separate hard-coded lists**, so a price change usually has to be made in both.
- **Seasonal crêpe** (`#temporada`): `section.season-section` with `article.season-card` (dark chocolate section, champagne-framed card, `.season-ribbon` "Solo de temporada", ingredient chips, price). Styles are in `styles.css` section 6b. The section is wrapped in `<!-- SEASON START -->` / `<!-- SEASON END -->` and its nav `<li>` in `<!-- SEASON NAV -->` / `<!-- /SEASON NAV -->`. To end the season, comment out both blocks (select the lines, Ctrl+/). Never nest a real HTML comment inside those blocks. The photo is `assets/crepes/crepa-de-temporada.jpg`.
- **Combo card**: `article.combo-card.combo-card--gold` (`--wide` spans the grid) in `card-grid--2 card-grid--combos`.
- **Drink card**: `article.drink-card` with an inline-SVG `.drink-icon`, and `span.drink-size` inside the title.

### Image fallback convention

Every product `<img>` carries an inline handler:

```html
onerror="this.style.display='none'; this.parentElement.classList.add('no-image')"
```

When the image is missing, the parent's `placeholder-*` gradient shows instead (the hero uses `this.closest('.hero-blob')`). Keep this handler on new images and add `loading="lazy"` to everything below the hero. The `src` extension must match the real file exactly (`.jpg`, `.jpeg` and `.png` are all in use, e.g. `banana-bliss.jpeg`, `choco-berry-blizz.jpeg`). GitHub Pages is case- and extension-sensitive.

## Styling rules

- Brand colors, fonts, shadows, radii, `--container` and `--header-h` are CSS custom properties on `:root` in `styles.css`. Use the tokens (`--rose`, `--rose-dark`, `--gold`, `--gold-dark`, `--brown`, `--muted-text`, etc.) rather than hard-coded hex values.
- Fonts are Cormorant Garamond (display) and Lato (body), loaded through the Google Fonts `<link>` in `<head>`. If you change a font, change the `<link>` **and** `--font-display`/`--font-body` together.
- Breakpoints: `1439px`, `1023px`, `900px`, `767px` (max-width), in section 14.
- Add `.reveal` to anything that should fade in on scroll. JS adds `.is-visible`, and the reduced-motion and no-IntersectionObserver fallbacks already show everything.
- Accessibility is deliberate: skip link, `aria-expanded` on the nav toggle, Escape closes the mobile nav, visible focus, and `prefers-reduced-motion`. Mark decorative SVGs `aria-hidden="true"`.

## External links

The WhatsApp order link (`wa.me/525550716370?text=…`, URL-encoded message), Instagram (`@cabelki_crepes`) and Facebook URLs each appear **twice**: in the `#contacto` CTA and in the footer. Update both places.

## Known quirks

- `README.md` lists `crepe-al-gusto.jpg` as pending, but the HTML references `crepe-al-gusto.png`, which exists.
- The card title "Choco Berry Bliss" uses the image file `choco-berry-blizz.jpeg`. That is intentional, so don't rename the file without updating the `src`.
- `hero-crepe.jpeg` and `strawberry-cream.png` are unused duplicates of the `.png`/`.jpg` files that are referenced.
- The Extra Toppings section uses an `h3.section-title` with no eyebrow and no `id`.
