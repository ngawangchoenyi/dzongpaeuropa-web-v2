#!/usr/bin/env python3
"""
build.py — Genera los HTML del sitio Dzongpa Europa desde las plantillas Jinja2.
Uso: python3 build.py

Soporta dos modos:
  1. YAML-driven: si existe content/{lang}/{page}.yml, usa templates/pages/{page}.html
     con los datos del YAML como variable 'data'.
  2. Legacy: si no hay YAML, usa el template del idioma directamente (comportamiento anterior).
"""

import os
import sys
import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(ROOT, 'templates')
CONTENT_DIR = os.path.join(ROOT, 'content')
PAGES_TEMPLATES_DIR = os.path.join(TEMPLATES_DIR, 'pages')

env = Environment(
    loader=FileSystemLoader(TEMPLATES_DIR),
    autoescape=False,
    keep_trailing_newline=True,
)

# Mapa: lang prefix → base template (para YAML-driven pages)
BASE_TEMPLATE = {
    'es': '_base.html',
    'en': '_base_en.html',
    'fr': '_base_fr.html',
    'de': '_base_de.html',
    'zh': '_base_zh.html',
}

# Mapa: output path → (lang, page_stem) para páginas YAML-driven
# ES usa el slug de página en español; el resto usan el slug en inglés
YAML_PAGE_MAP = {
    'quienes-somos.html': ('es', 'about'),
    'en/about.html':      ('en', 'about'),
    'fr/about.html':      ('fr', 'about'),
    'de/about.html':      ('de', 'about'),
    'zh/about.html':      ('zh', 'about'),
    'historia.html':      ('es', 'history'),
    'en/history.html':    ('en', 'history'),
    'fr/history.html':    ('fr', 'history'),
    'de/history.html':    ('de', 'history'),
    'zh/history.html':    ('zh', 'history'),
    'linaje.html':        ('es', 'lineage'),
    'en/lineage.html':    ('en', 'lineage'),
    'fr/lineage.html':    ('fr', 'lineage'),
    'de/lineage.html':    ('de', 'lineage'),
    'zh/lineage.html':    ('zh', 'lineage'),
    'rinpoche.html':      ('es', 'rinpoche'),
    'en/rinpoche.html':   ('en', 'rinpoche'),
    'fr/rinpoche.html':   ('fr', 'rinpoche'),
    'de/rinpoche.html':   ('de', 'rinpoche'),
    'zh/rinpoche.html':   ('zh', 'rinpoche'),
    'actividades.html':   ('es', 'activities'),
    'en/activities.html': ('en', 'activities'),
    'fr/activities.html': ('fr', 'activities'),
    'de/activities.html': ('de', 'activities'),
    'zh/activities.html': ('zh', 'activities'),
    'hazte-socio.html':   ('es', 'join'),
    'en/join.html':       ('en', 'join'),
    'fr/join.html':       ('fr', 'join'),
    'de/join.html':       ('de', 'join'),
    'zh/join.html':       ('zh', 'join'),
    'donaciones.html':    ('es', 'donate'),
    'en/donate.html':     ('en', 'donate'),
    'fr/donate.html':     ('fr', 'donate'),
    'de/donate.html':     ('de', 'donate'),
    'zh/donate.html':     ('zh', 'donate'),
    'gracias.html':       ('es', 'gracias'),
    'en/thanks.html':     ('en', 'thanks'),
    'fr/thanks.html':     ('fr', 'thanks'),
    'de/thanks.html':     ('de', 'thanks'),
    'zh/thanks.html':     ('zh', 'thanks'),
    'contacto.html':      ('es', 'contact'),
    'en/contact.html':    ('en', 'contact'),
    'fr/contact.html':    ('fr', 'contact'),
    'de/contact.html':    ('de', 'contact'),
    'zh/contact.html':    ('zh', 'contact'),
    'pujas-semanales.html': ('es', 'pujas-semanales'),
}

PAGES = [
    'index.html',
    'quienes-somos.html',
    'historia.html',
    'rinpoche.html',
    'linaje.html',
    'actividades.html',
    'hazte-socio.html',
    'donaciones.html',
    'gracias.html',
    'contacto.html',
    'pujas-semanales.html',
    'aviso-legal.html',
    'privacidad.html',
    'creditos.html',
    '404.html',
]

EN_PAGES = [
    'en/index.html',
    'en/about.html',
    'en/history.html',
    'en/rinpoche.html',
    'en/lineage.html',
    'en/activities.html',
    'en/join.html',
    'en/donate.html',
    'en/thanks.html',
    'en/contact.html',
    'en/legal.html',
    'en/privacy.html',
    'en/credits.html',
]

FR_PAGES = [
    'fr/index.html',
    'fr/about.html',
    'fr/history.html',
    'fr/rinpoche.html',
    'fr/lineage.html',
    'fr/activities.html',
    'fr/join.html',
    'fr/donate.html',
    'fr/thanks.html',
    'fr/contact.html',
    'fr/legal.html',
    'fr/privacy.html',
    'fr/credits.html',
]

DE_PAGES = [
    'de/index.html',
    'de/about.html',
    'de/history.html',
    'de/rinpoche.html',
    'de/lineage.html',
    'de/activities.html',
    'de/join.html',
    'de/donate.html',
    'de/thanks.html',
    'de/contact.html',
    'de/legal.html',
    'de/privacy.html',
    'de/credits.html',
]

ZH_PAGES = [
    'zh/index.html',
    'zh/about.html',
    'zh/history.html',
    'zh/rinpoche.html',
    'zh/lineage.html',
    'zh/activities.html',
    'zh/join.html',
    'zh/donate.html',
    'zh/thanks.html',
    'zh/contact.html',
    'zh/legal.html',
    'zh/privacy.html',
    'zh/credits.html',
]


def load_yaml_content(lang, page_stem):
    """Carga el archivo YAML de contenido para una página e idioma dados."""
    yaml_path = os.path.join(CONTENT_DIR, lang, f'{page_stem}.yml')
    if not os.path.exists(yaml_path):
        return None
    with open(yaml_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    return data


def render_yaml_page(lang, page_stem):
    """Renderiza una página usando YAML + template único en templates/pages/."""
    data = load_yaml_content(lang, page_stem)
    if data is None:
        return None
    # Asegurar que page.base esté definido
    if 'page' not in data:
        data['page'] = {}
    if 'base' not in data['page']:
        data['page']['base'] = BASE_TEMPLATE.get(lang, '_base.html')
    template = env.get_template(f'pages/{page_stem}.html')
    return template.render(data=data)


def build():
    ok = 0
    errors = []
    yaml_count = 0
    legacy_count = 0
    all_pages = PAGES + EN_PAGES + FR_PAGES + DE_PAGES + ZH_PAGES

    for page in all_pages:
        try:
            html = None

            # Intentar modo YAML-driven primero
            if page in YAML_PAGE_MAP:
                lang, page_stem = YAML_PAGE_MAP[page]
                html = render_yaml_page(lang, page_stem)
                if html is not None:
                    yaml_count += 1
                    print(f'  ✓ {page}  [yaml]')

            # Fallback: sistema legacy de templates por idioma
            if html is None:
                template = env.get_template(page)
                html = template.render()
                legacy_count += 1
                print(f'  ✓ {page}')

            html = '\n'.join(line.rstrip() for line in html.splitlines()) + '\n'

            out_path = os.path.join(ROOT, page)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(html)
            ok += 1

        except Exception as e:
            errors.append(f'  ✗ {page}: {e}')
            print(errors[-1])

    print(f'\n✓ Build completo: {ok} páginas generadas ({yaml_count} yaml, {legacy_count} legacy), {len(errors)} errores.')
    if errors:
        for e in errors:
            print(e)
        sys.exit(1)

if __name__ == '__main__':
    build()
