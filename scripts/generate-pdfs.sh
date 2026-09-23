#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
command -v manus-md-to-pdf >/dev/null || { echo "manus-md-to-pdf is required"; exit 1; }
for src in "$ROOT"/09-downloads/*.md; do
  case "$(basename "$src")" in README.md) continue;; esac
  out="${src%.md}.pdf"
  manus-md-to-pdf "$src" "$out"
  echo "Generated $out"
done
