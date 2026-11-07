# CABELKI — Concepto de lujo con menú completo

Artefacto interactivo en HTML, CSS y JavaScript. Conserva la dirección visual de espresso, marfil, rosa y oro, con categorías independientes, navegación persistente y un carrusel de promociones y avisos.

## Contenido verificado

La fuente es `../../index.html`, en el commit `adae24015be877527f6c8f6e7ef2700dc6d7d6b2`. Los ingredientes, precios, fotografías y opciones se cotejan con el HTML activo del repositorio, no con las referencias antiguas del README principal.

| Sección | Contenido |
| --- | --- |
| Crepas Signatures | Red Velvet Berry y Apple Pie Supreme: $134 cada una |
| Crepas Dulces | Choco Berry Bliss, Banana Bliss, Strawberry Cream y Nutty Golden: $123 cada una |
| Crepas Saladas | Pepperoni Melt y Aloha Delight: $129 cada una |
| Crepas al gusto | $113; incluye 1 base y 1 topping, con 5 opciones en cada lista |
| Extras para crepas | 10 extras con sus precios individuales, desde $10 hasta $25 |
| Fresas con crema | Berry Bloom de 500 ml: $115, incluye 4 toppings; lista propia de 7 opciones con precios para extras |
| Temporada | Calaverita de mis Amores: $134, con ingredientes y aviso de disponibilidad |
| Contacto | Ubicación, horario, WhatsApp, Instagram y Facebook |

Los combos y las bebidas están comentados y ocultos en el sitio original. Este concepto respeta ese estado. Para volver a ofrecerlos, primero confirmar disponibilidad y precios.

## Carrusel de promociones y avisos

El carrusel aparece debajo de la portada y tiene acceso desde la franja superior y el menú principal. Sus tres avisos iniciales usan información existente:

1. Calaverita de mis Amores: $134, hasta agotar existencias.
2. Berry Bloom: $115, 500 ml y 4 toppings incluidos.
3. Horario de lunes a sábado, de 18:00 a 22:00, con enlace para pedir por WhatsApp.

Son novedades y avisos, sin descuentos ni vigencias inventadas. El enlace «Consultar promociones» abre WhatsApp con una consulta preparada; no envía mensajes automáticamente.

Para añadir un aviso, duplica un `article.promo-slide` dentro de `#promoSlides` en `index.html`. Asigna un `id` único y un `aria-label` descriptivo, y cambia el texto, la fotografía, el enlace y las condiciones según la promoción confirmada. Los indicadores, el total y los anuncios accesibles se calculan desde las diapositivas al iniciar.

El carrusel se controla con flechas, indicadores, teclas izquierda/derecha cuando los controles tienen el foco y gestos horizontales en pantalla táctil. No avanza automáticamente. Respeta la preferencia de movimiento reducido; sin JavaScript, los tres avisos y el menú siguen disponibles.

## Vista local

Desde `/workspace/cabelki`:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Ruta interna: `http://127.0.0.1:8000/design-artifacts/luxury-concept/`.

Las capturas `cabelki-luxury-desktop.png` y `cabelki-luxury-mobile.png` muestran el diseño completo. `cabelki-complete-menu.png` detalla las cinco categorías; `cabelki-promotions.png` muestra el carrusel.

Este artefacto reutiliza `../../assets/crepes/` y las fuentes de Google Fonts. No requiere instalar dependencias de aplicación ni un proceso de compilación. Los archivos de la página principal no se sustituyen ni se publica el diseño automáticamente.
