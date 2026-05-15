#!/usr/bin/env python3
"""
build.py — Genera los HTML del sitio Dzongpa Europa desde las plantillas Jinja2.
Uso: python3 build.py
"""

import os
from jinja2 import Environment, FileSystemLoader

ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(ROOT, 'templates')

env = Environment(
    loader=FileSystemLoader(TEMPLATES_DIR),
    autoescape=False,
    keep_trailing_newline=True,
)

PAGES = [
    'index.html',
    'quienes-somos.html',
    'historia.html',
    'rinpoche.html',
    'linaje.html',
    'actividades.html',
    'hazte-socio.html',
    'donaciones.html',
    'contacto.html',
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
    'zh/contact.html',
    'zh/legal.html',
    'zh/privacy.html',
    'zh/credits.html',
]

def build():
    ok = 0
    errors = []
    all_pages = PAGES + EN_PAGES + FR_PAGES + DE_PAGES + ZH_PAGES

    for page in all_pages:
        try:
            template = env.get_template(page)
            html = template.render()
            out_path = os.path.join(ROOT, page)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f'  ✓ {page}')
            ok += 1
        except Exception as e:
            errors.append(f'  ✗ {page}: {e}')
            print(errors[-1])

    print(f'\n✓ Build completo: {ok} páginas generadas, {len(errors)} errores.')
    if errors:
        for e in errors:
            print(e)

if __name__ == '__main__':
    build()
