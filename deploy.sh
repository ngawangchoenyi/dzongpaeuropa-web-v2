#!/bin/bash
# deploy.sh — sube los cambios de la web a GitHub (Vercel lo despliega automáticamente)
# Uso: ./deploy.sh "descripción del cambio"
#      ./deploy.sh           (usa mensaje genérico)

MSG="${1:-Actualización web}"

git add \
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
  sitemap.xml \
  robots.txt \
  vercel.json \
  assets/css/style.css \
  assets/js/lightbox.js \
  deploy.sh

git commit -m "$MSG"
git push origin main
