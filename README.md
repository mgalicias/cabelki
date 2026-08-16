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

## 5. Notas de diseño

- Colores, tipografías (Playfair Display + Montserrat) y contenido del menú están tomados directamente del menú original de CABELKI.
- El elemento "Crêpe al Gusto" incluye una vista previa interactiva: al elegir un topping, la crêpe en pantalla cambia de "relleno" en tiempo real.
- El sitio respeta `prefers-reduced-motion`, tiene foco de teclado visible y navegación accesible por teclado.
- Los botones "Ordenar ahora" y "Ver Instagram" están listos para conectarse a tu sistema de pedidos (WhatsApp, Instagram, o un enlace de pedidos en línea) — solo reemplaza el `href="#"` correspondiente en `index.html`.
