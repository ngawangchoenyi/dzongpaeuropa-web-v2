# Dzongpa Europa · Web v1

Sitio web estático de la Asociación Cultural Dzongpa Valencia. Construido en HTML, CSS y JavaScript puro, sin dependencias ni proceso de compilación. Listo para desplegar en Vercel con un par de clics.

---

## Estructura

```
dzongpa-europa/
├── index.html              ← página de inicio
├── quienes-somos.html
├── historia.html
├── rinpoche.html
├── linaje.html
├── actividades.html
├── hazte-socio.html
├── donaciones.html
├── contacto.html
├── aviso-legal.html
├── privacidad.html
├── creditos.html
├── 404.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/                ← todas las imágenes organizadas por categoría
├── _build/                 ← script para regenerar páginas internas
├── vercel.json
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Cómo previsualizar localmente

Doble clic en `index.html` y se abre en el navegador. Pero los enlaces entre páginas funcionan mejor si lo sirves con un servidor local:

```bash
# Con Python
python3 -m http.server 8000

# O con Node
npx serve .
```

Luego abre `http://localhost:8000` en el navegador.

---

## Cómo desplegar en Vercel

### Opción A · Importar desde GitHub (recomendado)

1. Crea una cuenta gratuita en [vercel.com](https://vercel.com).
2. Sube esta carpeta a un repositorio de GitHub (`dzongpaeuropa-web` o el nombre que prefieras).
3. En Vercel, clica **Add New → Project → Import Git Repository** y selecciona el repo.
4. Vercel detectará que es un sitio estático. Deja todos los valores por defecto y clica **Deploy**.
5. En 30-60 segundos, la web estará en una URL del tipo `dzongpaeuropa.vercel.app`.
6. Para conectar el dominio `dzongpaeuropa.org`: ve a **Settings → Domains**, añade el dominio y sigue las instrucciones de configuración DNS.

### Opción B · Drag and drop sin GitHub

1. Crea una cuenta en [vercel.com](https://vercel.com).
2. Comprime esta carpeta entera en un ZIP.
3. En Vercel, crea un nuevo proyecto y sube el ZIP arrastrándolo.
4. Vercel desplegará el sitio automáticamente.

### Opción C · Vercel CLI

```bash
npm install -g vercel
cd dzongpa-europa
vercel
```

Sigue las indicaciones del CLI. La primera vez te pedirá vincular el proyecto.

---

## Cómo editar contenidos

### Textos

Los textos están directamente en los archivos `.html`. Para editarlos:

1. Abre el archivo correspondiente (por ejemplo, `rinpoche.html`).
2. Busca el texto que quieres cambiar.
3. Modifícalo y guarda.
4. Si tienes el repositorio conectado a Vercel, haz commit y push: el sitio se actualiza automáticamente en 30 segundos.

### Imágenes

Las imágenes viven en `assets/img/` organizadas por categoría:
- `logo/` – logo y favicons
- `rinpoche/` – retratos de Rinpoche
- `dalai-lama/` – con Su Santidad el Dalái Lama
- `maestros-sakya/` – con otros maestros
- `juventud-rinpoche/` – años de formación
- `linaje-gongkar/` – monasterio, murales, iconografía
- `comunidad-centros/` – sangha y centros del mundo
- `espana/` – actividad en España
- `promocional/` – material gráfico

Para sustituir una imagen, conserva el mismo nombre de archivo y sube la nueva. La web la cogerá automáticamente.

### Páginas internas (avanzado)

Si en algún momento quieres regenerar todas las páginas internas desde la plantilla compartida (porque cambias el menú, el footer o el SEO), edita `_build/generar_paginas.js` y ejecuta:

```bash
node _build/generar_paginas.js
```

La página de inicio (`index.html`) está editada a mano y no se regenera con este script.

---

## Funcionalidades pendientes (v2)

- [ ] **Imágenes pendientes**: 4 fotos de la comunidad de Australia y la infografía "Dzongpa Global". Se han dejado placeholders en `/assets/img/comunidad-centros/_PENDIENTE_*.txt` con los nombres exactos que deben tener.
- [ ] **Formulario de contacto**: actualmente apunta a `https://formspree.io/f/REEMPLAZAR`. Crear cuenta gratuita en [Formspree](https://formspree.io) o similar (HelloForms, Web3Forms, Tally) y sustituir la URL en `contacto.html`.
- [ ] **Pasarela de pago para donaciones**: integrar Stripe Checkout, HelloAsso o GoCardless cuando estén abiertas las cuentas correspondientes.
- [ ] **Calendario de actividades**: integrar un Google Calendar embebido o usar [The Events Calendar](https://theeventscalendar.com).
- [ ] **Newsletter**: caja de suscripción con MailerLite o Mailchimp.
- [ ] **Versiones en inglés y chino**: estructura preparada con URLs `/en/` y `/zh/`.
- [ ] **Datos legales**: completar CIF, número de registro y domicilio en `aviso-legal.html` y `privacidad.html` antes de publicar.

---

## Tecnología

- HTML semántico, mobile-first, sin frameworks ni dependencias de build.
- CSS puro con variables, sin pre-procesador.
- Tipografías Google Fonts: Cormorant Garamond (serif) e Inter (sans).
- JavaScript mínimo (solo menú móvil).
- Compatible con todos los navegadores modernos (Chrome, Firefox, Safari, Edge).
- Optimizado para Lighthouse: rendimiento, accesibilidad y SEO altos.

---

## Paleta de marca

| Color | Hex | Uso |
|---|---|---|
| Granate Dzongpa | `#8B1A1A` | Color principal |
| Dorado tibetano | `#C9A032` | Acentos |
| Crema mantra | `#F5EFE0` | Fondos suaves |
| Azul profundo | `#1F3A5F` | Footer, títulos |
| Texto principal | `#2B2B2B` | Cuerpo de texto |

---

## Licencia y créditos

© Asociación Cultural Dzongpa Valencia. Todos los derechos reservados.

Construido bajo la guía espiritual de Su Eminencia el VI Gongkar Dorje Denpa Rinpoche. Que esta labor beneficie a todos los seres.
