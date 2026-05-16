#!/bin/bash
# deploy.sh — construye la web desde plantillas y sube a GitHub (Vercel despliega solo)
# Uso: ./deploy.sh "descripción del cambio"
#      ./deploy.sh           (usa mensaje genérico)

MSG="${1:-Actualización web}"

if command -v python3 &>/dev/null; then
  echo "▶ Generando HTML desde plantillas..."
  python3 build.py || { echo "✗ Error en build.py"; exit 1; }
else
  echo "ℹ python3 no encontrado — usando HTML ya generado"
fi

git add \
  templates/ \
  content/ \
  build.py \
  index.html \
  quienes-somos.html \
  historia.html \
  rinpoche.html \
  linaje.html \
  actividades.html \
  hazte-socio.html \
  donaciones.html \
  contacto.html \
  aviso-legal.html \
  privacidad.html \
  creditos.html \
  404.html \
  en/ \
  fr/ \
  de/ \
  zh/ \
  sitemap.xml \
  robots.txt \
  manifest.json \
  vercel.json \
  assets/css/style.css \
  assets/js/lightbox.js \
  assets/img/ \
  googleb3b0a98eb44d048e.html \
  deploy.sh

git commit -m "$MSG"
git push origin main
