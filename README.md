# CABELKI Crêpes — Sitio web

Sitio estático (HTML + CSS + JS puro, sin frameworks) para la crepería CABELKI.

## 1. Estructura del proyecto

```
cabelki-crepes/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── logo/
    │   └── favicon.svg
    ├── crepes/      ← fotos de crêpes (dulces, saladas y signature)
    ├── drinks/       ← reservada para fotos de bebidas si más adelante quieres reemplazar los íconos
    └── icons/        ← reservada para íconos adicionales
```

## 2. Dónde guardar cada foto de producto

El sitio ya está listo para mostrar fotos reales: cada tarjeta apunta a un archivo dentro de `assets/crepes/`. Mientras no exista el archivo, la tarjeta muestra automáticamente un fondo degradado elegante con un pequeño ícono de crêpe (no verás un ícono de "imagen rota").

Guarda tus fotos con **estos nombres exactos** (idealmente 1200×900 px o proporción 4:3, buena luz, fondo limpio). Puedes usar `.jpg`, `.jpeg` o `.png` — solo asegúrate de que la extensión en el archivo coincida con la que usa `index.html`:

| Archivo en `assets/crepes/` | Producto | Estado |
|---|---|---|
| `hero-crepe.png` | Logo/imagen principal del hero | ✅ Ya subida |
| `red-velvet-berry.jpg` | Red Velvet Berry | ✅ Ya subida |
| `apple-pie-supreme.jpg` | Apple Pie Supreme | ✅ Ya subida |
| `banana-bliss.jpeg` | Banana Bliss | ✅ Ya subida |
| `strawberry-cream.jpg` | Strawberry Cream | ✅ Ya subida |
| `choco-berry-blizz.jpeg` | Choco Berry Blizz | ✅ Ya subida |
| `nutty-golden.jpg` | Nutty Golden | ✅ Ya subida |
| `pepperoni-melt.jpeg` | Pepperoni Melt | ✅ Ya subida |
| `aloha-delight.jpg` | Aloha Delight | ✅ Ya subida |
| `crepe-al-gusto.jpg` | Crêpe al Gusto (sección "arma tu crêpe") | ⏳ Pendiente — hoy muestra un placeholder |

En cuanto subas un archivo con el nombre correcto, la imagen reemplaza automáticamente el placeholder — no necesitas tocar el código HTML.

Si más adelante agregas fotos para las bebidas calientes, lo más sencillo es reemplazar los íconos SVG en `index.html` (sección `#bebidas`) por una etiqueta `<img>` apuntando a `assets/drinks/`.

## 3. Ver el sitio en tu computadora

No necesitas instalar nada para verlo:

1. Descarga o clona la carpeta `cabelki-crepes`.
2. Haz doble clic en `index.html` y se abrirá en tu navegador.

Si prefieres un servidor local (recomendado para que las rutas de imágenes se comporten igual que en producción):

```bash
cd cabelki-crepes
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 4. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `cabelki-crepes`).
2. Sube el contenido de esta carpeta a la raíz del repositorio:
   ```bash
   cd cabelki-crepes
   git init
   git add .
   git commit -m "Sitio CABELKI Crêpes"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/cabelki-crepes.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages**.
4. En "Branch", selecciona `main` y la carpeta `/ (root)`. Guarda.
5. Después de uno o dos minutos, tu sitio estará disponible en:
   `https://TU-USUARIO.github.io/cabelki-crepes/`

### Alternativas igual de sencillas
- **Netlify**: arrastra la carpeta `cabelki-crepes` a [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: `vercel` desde la carpeta del proyecto (requiere la CLI de Vercel).

## 5. Cómo agregar un nuevo sabor de crêpe

No necesitas tocar `styles.css` ni `script.js` — cada crêpe es un bloque de HTML independiente (una "tarjeta") dentro de `index.html`. Para agregar uno nuevo:

1. **Abre `index.html`** y localiza la sección donde quieres agregar el sabor:
   - `id="signature"` → Crêpes Signature
   - `id="dulces"` → Crêpes Dulces
   - `id="saladas"` → Crêpes Saladas

2. **Copia una tarjeta existente completa**, desde `<article class="product-card reveal">` hasta su `</article>` de cierre. Por ejemplo, esta es la de "Banana Bliss":

   ```html
   <article class="product-card reveal">
     <div class="card-image placeholder-sweet">
       <img src="assets/crepes/banana-bliss.jpg" alt="Crêpe Banana Bliss con plátano, nutella y coco rallado" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-image')">
     </div>
     <div class="card-body">
       <h3 class="card-title">Banana Bliss</h3>
       <p class="card-desc">Plátano, nutella, coco rallado y chocolate líquido.</p>
       <p class="card-price">$93</p>
     </div>
   </article>
   ```

3. **Pégala justo debajo**, dentro del mismo `<div class="card-grid ...">`, y cambia:
   - `src="assets/crepes/banana-bliss.jpg"` → el nombre de archivo de tu nueva foto (guárdala en `assets/crepes/` con ese mismo nombre; mientras no exista, se ve un placeholder elegante automáticamente).
   - El `alt="..."` → una descripción corta de la foto.
   - `<h3 class="card-title">` → el nombre del sabor.
   - `<p class="card-desc">` → los ingredientes.
   - `<p class="card-price">` → el precio.
   - La clase `placeholder-sweet` del `<div class="card-image ...">` según la sección: usa `placeholder-signature`, `placeholder-sweet` o `placeholder-savory`.

4. Si quieres que destaque con una etiqueta como "★ Favoritas", agrega dentro de `card-image`:
   ```html
   <span class="card-badge">&#9733; Favoritas</span>
   ```

5. Guarda el archivo y ábrelo en el navegador — no hace falta recargar nada más, el nuevo sabor aparece con el mismo estilo (tarjeta, sombra, animación al hacer scroll) que el resto del menú.

> Tip: si agregas 4 o más sabores en la sección "Dulces" (que usa `card-grid--3`, tres columnas), el diseño se ajusta solo — no necesitas cambiar el grid.

## 6. Opciones de tipografía

El sitio usa actualmente **Cormorant Garamond** (títulos) + **Lato** (texto) — un estilo más delicado y romántico. Si quieres probar otro estilo, aquí tienes alternativas — todas gratuitas en Google Fonts y afines a la estética boutique del sitio:

| Opción | Títulos | Texto | Sensación |
|---|---|---|---|
| **Actual** | Cormorant Garamond | Lato | Delicado y ligero, letras finas, toque femenino |
| **1 — Editorial clásico** | Playfair Display | Montserrat | El estilo original del sitio — elegante y muy legible |
| **2 — Moderno boutique** | DM Serif Display | Poppins | Serif con más carácter/contraste, combinado con una sans redondeada y amigable |
| **3 — Cálido artesanal** | Fraunces | Nunito Sans | Serif con personalidad "hecho a mano", cálido, menos formal |

Para cambiar de opción:

1. En `index.html`, reemplaza la línea de Google Fonts (dentro de `<head>`) por la combinación elegida, por ejemplo para volver a la opción 1 (Playfair + Montserrat):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```
2. En `styles.css`, dentro de `:root`, actualiza:
   ```css
   --font-display: "Playfair Display", "Georgia", serif;
   --font-body: "Montserrat", "Helvetica Neue", sans-serif;
   ```
3. Guarda y recarga — el cambio aplica a todo el sitio automáticamente.

> ⚠️ Importante: los nombres de fuente en `--font-display` / `--font-body` solo funcionan si esa misma fuente está cargada en el `<link>` de Google Fonts en `<head>`. Si cambias uno sin el otro, el navegador cae de vuelta a una fuente genérica (Georgia o Helvetica) sin avisar — por eso siempre se cambian los dos juntos.

## 7. Notas de diseño

- **Paleta de marca CABELKI**: Rosa CABELKI `#E8A6B8`, Rosa pastel `#F6D6DE`, Crema `#FFF5E8`, Chocolate `#5A3528`, Café medio `#8B5E4A`, Champagne `#D9B98C` y Beige rosado `#E7C9C0`. Todos los colores viven como variables en `:root` al inicio de `styles.css` (por ejemplo `--rose`, `--gold`, `--brown`) — cambiar un valor ahí actualiza todo el sitio.
- Los precios se muestran en pesos mexicanos (sin necesidad de la etiqueta "MXN" junto al número).
- La sección **"Crêpe al Gusto"** (después de Crêpes Saladas) es una tarjeta destacada de "arma tu crêpe": 1 base a elegir entre 4 + 1 topping a elegir entre 4, por $83. No es interactiva (no hay que hacer clic para seleccionar) — es informativa, igual que el resto del menú.
- El sitio respeta `prefers-reduced-motion`, tiene foco de teclado visible y navegación accesible por teclado.
- El botón **"Ordenar ahora"** (sección Contacto) abre WhatsApp directo al número de CABELKI con un mensaje de pedido ya escrito. El botón **"Ver Facebook"** e **"Ver Instagram"** llevan a los perfiles oficiales del negocio.
