# Dzongpa Europa - Web v2

Sitio web estatico multilingue de Dzongpa Europa. El proyecto usa HTML, CSS y JavaScript puro. No usa React, Next.js, Astro ni ningun sistema de frontend.

La web publicada se genera desde archivos fuente en `content/` y `templates/` mediante `build.py`.

---

## Regla principal

El espanol es la fuente principal del sitio. Las versiones en ingles, frances, aleman y chino deben mantenerse alineadas con la version espanola.

Al hacer cambios:

- Mantener el estilo visual existente.
- No borrar paginas legales.
- Guardar imagenes y archivos publicos dentro de `assets/`.
- Hacer cambios pequenos y reversibles.
- Si se crean paginas o idiomas nuevos, actualizar tambien `sitemap.xml` y los enlaces `hreflang`.
- No convertir el proyecto a otro framework o build system.

---

## Estructura del proyecto

```text
dzongpaeuropa-web-v2/
├── content/                # Contenido fuente por idioma en YAML
│   ├── es/
│   ├── en/
│   ├── fr/
│   ├── de/
│   └── zh/
├── templates/              # Plantillas HTML fuente
│   ├── pages/              # Plantillas compartidas de paginas internas
│   ├── _base.html          # Base ES
│   ├── _base_en.html       # Base EN
│   ├── _base_fr.html       # Base FR
│   ├── _base_de.html       # Base DE
│   └── _base_zh.html       # Base ZH
├── assets/
│   ├── css/style.css       # Estilos globales
│   ├── js/lightbox.js      # JavaScript del lightbox
│   └── img/                # Imagenes del sitio
├── en/                     # Paginas generadas en ingles
├── fr/                     # Paginas generadas en frances
├── de/                     # Paginas generadas en aleman
├── zh/                     # Paginas generadas en chino
├── *.html                  # Paginas generadas en espanol
├── build.py                # Generador del sitio
├── sitemap.xml             # Sitemap publico
├── robots.txt
├── manifest.json
├── vercel.json
└── README.md
```

---

## Que archivos se editan normalmente

### Textos

Editar los textos en:

```text
content/es/
content/en/
content/fr/
content/de/
content/zh/
```

Cada idioma tiene los mismos archivos principales:

```text
about.yml
activities.yml
contact.yml
donate.yml
history.yml
join.yml
lineage.yml
rinpoche.yml
```

### Estructura de paginas

Editar plantillas en:

```text
templates/
templates/pages/
```

Estas plantillas controlan cabecera, menu, footer, SEO y estructura comun.

### Estilos

Editar CSS en:

```text
assets/css/style.css
```

Importante: si se cambia CSS o JavaScript y Vercel mantiene cache, revisar la version del enlace al CSS en las plantillas base, por ejemplo:

```html
/assets/css/style.css?v=20260516-nav
```

### Imagenes

Guardar nuevas imagenes dentro de:

```text
assets/img/
```

No poner imagenes fuera de `assets/`.

---

## Que archivos no conviene editar directamente

Las paginas generadas pueden editarse en una emergencia, pero no son la fuente principal:

```text
index.html
historia.html
rinpoche.html
linaje.html
actividades.html
hazte-socio.html
donaciones.html
contacto.html
en/
fr/
de/
zh/
```

Si editas una pagina generada y luego ejecutas `build.py`, el cambio puede perderse. Lo correcto es cambiar `content/` o `templates/` y regenerar.

---

## Como generar la web

En Windows, desde la carpeta del proyecto:

```powershell
python -X utf8 build.py
```

Resultado esperado:

```text
Build completo: 61 paginas generadas, 0 errores.
```

Si faltan dependencias:

```powershell
python -m pip install pyyaml jinja2
```

---

## Como previsualizar localmente

Despues de generar la web:

```powershell
python -m http.server 8000
```

Abrir en el navegador:

```text
http://localhost:8000
```

Tambien se puede abrir `index.html` directamente, pero el servidor local refleja mejor el comportamiento real de enlaces y rutas.

---

## Flujo recomendado con VS Code y GitHub Desktop

1. Abrir la carpeta del proyecto en VS Code.
2. Editar archivos fuente en `content/`, `templates/` o `assets/`.
3. Ejecutar:

```powershell
python -X utf8 build.py
```

4. Revisar la web en local.
5. Revisar cambios en GitHub Desktop.
6. Escribir un resumen claro del cambio.
7. Hacer commit.
8. Hacer push a GitHub.

Vercel publica automaticamente los cambios desde GitHub.

---

## Comprobaciones utiles

Ver estado del repositorio:

```powershell
git status
```

Comprobar problemas de espacios o finales de linea:

```powershell
git diff --check
```

Comprobar JavaScript:

```powershell
node --check assets/js/lightbox.js
```

---

## Idiomas y SEO

La web tiene versiones:

- Espanol: `/`
- Ingles: `/en/`
- Frances: `/fr/`
- Aleman: `/de/`
- Chino: `/zh/`

Al crear o eliminar paginas hay que revisar:

- Enlaces del menu.
- Enlaces de idioma.
- Etiquetas `canonical`.
- Etiquetas `hreflang`.
- `sitemap.xml`.

El sitemap no se regenera automaticamente. Si cambia la estructura de paginas, hay que actualizarlo.

---

## Paginas legales

No eliminar estas paginas:

- Aviso legal / Legal notice.
- Privacidad / Privacy policy.
- Creditos / Credits.

Si se cambian datos legales, hacerlo primero en espanol y despues replicarlo en los demas idiomas.

---

## Despliegue

El despliegue principal se hace por GitHub + Vercel:

```text
VS Code -> build.py -> GitHub Desktop -> commit -> push -> Vercel
```

El archivo `deploy.sh` existe como ayuda para terminal, pero en Windows es mas seguro usar GitHub Desktop salvo que se este trabajando desde Git Bash o WSL.

---

## Mantenimiento recomendado

- Optimizar imagenes grandes antes de subirlas.
- Mantener nombres de archivos claros y estables.
- Revisar responsive en escritorio, tablet y movil.
- Verificar especialmente el menu superior despues de cambios de CSS.
- Mantener el README actualizado cuando cambie el flujo de trabajo.

---

## Creditos

© Asociacion Cultural Dzongpa Valencia. Todos los derechos reservados.

Sitio desarrollado para preservar y difundir la actividad de Dzongpa Europa bajo la guia espiritual de Su Eminencia el VI Gongkar Dorje Dhenpa Rinpoche.
