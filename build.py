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

def build():
    ok = 0

    for page in PAGES + EN_PAGES:
        template = env.get_template(page)
        ht