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

Guarda tus fotos con **estos nombres exactos**, en formato `.jpg` (idealmente 1200×900 px o proporción 4:3, buena luz, fondo limpio):

| Archivo a guardar en `assets/crepes/` | Producto |
|---|---|
| `hero-crepe.jpg` | Foto principal del hero (la más atractiva, para la portada) |
| `red-velvet-berry.jpg` | Red Velvet Berry |
| `apple-pie-supreme.jpg` | Apple Pie Supreme |
| `banana-bliss.jpg` | Banana Bliss |
| `strawberry-cream.jpg` | Strawberry Cream |
| `nutty-golden.jpg` | Nutty Golden |
| `pepperoni-melt.jpg` | Pepperoni Melt |
| `aloha-delight.jpg` | Aloha Delight |

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

El sitio usa **Playfair Display** (títulos) + **Montserrat** (texto) por defecto. Si quieres probar otro estilo, aquí tienes 3 combinaciones alternativas — todas son gratuitas en Google Fonts y encajan con la estética boutique/elegante del sitio:

| Opción | Títulos | Texto | Sensación |
|---|---|---|---|
| **Actual** | Playfair Display | Montserrat | Editorial clásico, elegante y muy legible |
| **1 — Romántico** | Cormorant Garamond | Lato | Más delicado y ligero, letras finas, ideal si quieres un toque aún más femenino |
| **2 — Moderno boutique** | DM Serif Display | Poppins | Serif con más carácter/contraste, combinado con una sans redondeada y amigable |
| **3 — Cálido artesanal** | Fraunces | Nunito Sans | Serif con personalidad "hecho a mano", cálido, menos formal que Playfair |

Para cambiar de opción:

1. En `index.html`, reemplaza la línea de Google Fonts (dentro de `<head>`) por la combinación elegida, por ejemplo para la opción 1:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Lato:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```
2. En `styles.css`, dentro de `:root`, actualiza:
   ```css
   --font-display: "Cormorant Garamond", "Georgia", serif;
   --font-body: "Lato", "Helvetica Neue", sans-serif;
   ```
3. Guarda y recarga — el cambio aplica a todo el sitio automáticamente (nada más necesita tocarse).

## 7. Notas de diseño

- **Paleta de marca CABELKI**: Rosa CABELKI `#E8A6B8`, Rosa pastel `#F6D6DE`, Crema `#FFF5E8`, Chocolate `#5A3528`, Café medio `#8B5E4A`, Champagne `#D9B98C` y Beige rosado `#E7C9C0`. Todos los colores viven como variables en `:root` al inicio de `styles.css` (por ejemplo `--rose`, `--gold`, `--brown`) — cambiar un valor ahí actualiza todo el sitio.
- Los precios se muestran en pesos mexicanos (sin necesidad de la etiqueta "MXN" junto al número).
- El sitio respeta `prefers-reduced-motion`, tiene foco de teclado visible y navegación accesible por teclado.
- El botón **"Ordenar ahora"** (sección Contacto) abre WhatsApp directo al número de CABELKI con un mensaje de pedido ya escrito. El botón **"Ver Facebook"** e **"Ver Instagram"** llevan a los perfiles oficiales del negocio.
