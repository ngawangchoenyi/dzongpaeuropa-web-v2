#!/usr/bin/env python3
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
LANGS = {
    "es": {"slug": "deidades", "base": "_base.html", "translation_key": "en_slug", "translation_value": "deities"},
    "en": {"slug": "deities", "base": "_base_en.html", "translation_key": "es_slug", "translation_value": "deidades"},
    "fr": {"slug": "deities", "base": "_base_fr.html", "translation_key": "es_slug", "translation_value": "deidades"},
    "de": {"slug": "deities", "base": "_base_de.html", "translation_key": "es_slug", "translation_value": "deidades"},
    "zh": {"slug": "deities", "base": "_base_zh.html", "translation_key": "es_slug", "translation_value": "deidades"},
}
META_PATH = ROOT / "content" / "shared" / "deidades-meta.yml"

REQUIRED_TEXT = [
    "nombre",
    "descripcion_corta",
    "descripcion_larga",
    "beneficios",
]
VALID_ACCESS = {"publico", "restringido"}
BAD_TOKENS = [chr(0x00C3), chr(0x00C2), chr(0x00E2) + chr(0x20AC), chr(0xFFFD)]


def load(path):
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def contains_bad_token(value):
    if isinstance(value, str):
        return any(token in value for token in BAD_TOKENS)
    if isinstance(value, list):
        return any(contains_bad_token(item) for item in value)
    if isinstance(value, dict):
        return any(contains_bad_token(item) for item in value.values())
    return False


def main():
    errors = []
    meta = load(META_PATH)
    meta_items = meta.get("deidades", [])
    meta_ids = [item.get("id") for item in meta_items]

    if len(meta_ids) != 21:
        errors.append(f"Se esperaban 21 deidades en metadatos; hay {len(meta_ids)}.")
    if len(set(meta_ids)) != len(meta_ids):
        errors.append("Hay ids duplicados en content/shared/deidades-meta.yml.")

    categories = set((meta.get("categorias") or {}).keys())
    for item in meta_items:
        if item.get("categoria_key") not in categories:
            errors.append(f"Categoria no canonica en {item.get('id')}: {item.get('categoria_key')}")
        if item.get("nivel_acceso") not in VALID_ACCESS:
            errors.append(f"nivel_acceso invalido en {item.get('id')}: {item.get('nivel_acceso')}")
        if contains_bad_token(item):
            errors.append(f"Caracteres corruptos en metadatos de {item.get('id')}.")

    for lang, expected in LANGS.items():
        path = ROOT / "content" / lang / "deidades.yml"
        if not path.exists():
            errors.append(f"Falta {path.relative_to(ROOT)}.")
            continue

        content = load(path)
        page = content.get("page") or {}
        labels = content.get("labels") or {}
        deidades = content.get("deidades", [])
        content_ids = [item.get("id") for item in deidades]

        if page.get("lang") != lang:
            errors.append(f"page.lang incorrecto en {path.relative_to(ROOT)}: {page.get('lang')}")
        if page.get("base") != expected["base"]:
            errors.append(f"page.base incorrecto en {path.relative_to(ROOT)}: {page.get('base')}")
        if page.get("slug") != expected["slug"]:
            errors.append(f"page.slug incorrecto en {path.relative_to(ROOT)}: {page.get('slug')}")
        if page.get(expected["translation_key"]) != expected["translation_value"]:
            errors.append(
                f"Falta {expected['translation_key']}={expected['translation_value']} en {path.relative_to(ROOT)}."
            )
        if lang == "es" and page.get("translations_available") is False:
            errors.append("La pagina espanola de deidades tiene translations_available: false.")
        if not labels.get("catalogo_aria"):
            errors.append(f"Falta labels.catalogo_aria en {path.relative_to(ROOT)}.")

        if len(content_ids) != len(meta_ids):
            errors.append(f"Se esperaban {len(meta_ids)} deidades en {lang}; hay {len(content_ids)}.")
        if len(set(content_ids)) != len(content_ids):
            errors.append(f"Hay ids duplicados en content/{lang}/deidades.yml.")
        if content_ids != meta_ids:
            errors.append(f"Los ids u orden de content/{lang}/deidades.yml no coinciden con metadatos.")

        if contains_bad_token(content):
            errors.append(f"Caracteres corruptos en {path.relative_to(ROOT)}.")

        for item in deidades:
            for field in REQUIRED_TEXT:
                value = item.get(field)
                if value in (None, "", []):
                    errors.append(f"Campo vacio en {lang}/{item.get('id')}: {field}")
                if isinstance(value, str) and "[PENDIENTE" in value:
                    errors.append(f"Placeholder pendiente en {lang}/{item.get('id')}: {field}")
                if isinstance(value, list) and any("[PENDIENTE" in str(part) for part in value):
                    errors.append(f"Placeholder pendiente en {lang}/{item.get('id')}: {field}")

    if errors:
        print("VALIDACION DEIDADES: ERROR")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print("VALIDACION DEIDADES: OK")


if __name__ == "__main__":
    main()
