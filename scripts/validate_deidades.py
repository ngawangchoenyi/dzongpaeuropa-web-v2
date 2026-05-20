#!/usr/bin/env python3
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ES_PATH = ROOT / "content" / "es" / "deidades.yml"
META_PATH = ROOT / "content" / "shared" / "deidades-meta.yml"

REQUIRED_TEXT = [
    "nombre",
    "descripcion_corta",
    "descripcion_larga",
    "beneficios",
]
VALID_ACCESS = {"publico", "restringido"}


def load(path):
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def main():
    errors = []
    content = load(ES_PATH)
    meta = load(META_PATH)
    deidades = content.get("deidades", [])
    meta_items = meta.get("deidades", [])

    content_ids = [item.get("id") for item in deidades]
    meta_ids = [item.get("id") for item in meta_items]

    if len(content_ids) != 21:
        errors.append(f"Se esperaban 21 deidades en español; hay {len(content_ids)}.")
    if len(set(content_ids)) != len(content_ids):
        errors.append("Hay ids duplicados en content/es/deidades.yml.")
    if content_ids != meta_ids:
        errors.append("Los ids u orden de content/es/deidades.yml no coinciden con content/shared/deidades-meta.yml.")

    categories = set((meta.get("categorias") or {}).keys())
    for item in meta_items:
        if item.get("categoria_key") not in categories:
            errors.append(f"Categoría no canónica en {item.get('id')}: {item.get('categoria_key')}")
        if item.get("nivel_acceso") not in VALID_ACCESS:
            errors.append(f"nivel_acceso inválido en {item.get('id')}: {item.get('nivel_acceso')}")

    for item in deidades:
        for field in REQUIRED_TEXT:
            value = item.get(field)
            if value in (None, "", []):
                errors.append(f"Campo vacío en {item.get('id')}: {field}")
            if isinstance(value, str) and "[PENDIENTE" in value:
                errors.append(f"Placeholder pendiente en {item.get('id')}: {field}")
            if isinstance(value, list) and any("[PENDIENTE" in str(part) for part in value):
                errors.append(f"Placeholder pendiente en {item.get('id')}: {field}")

    if errors:
        print("VALIDACIÓN DEIDADES: ERROR")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print("VALIDACIÓN DEIDADES: OK")


if __name__ == "__main__":
    main()
