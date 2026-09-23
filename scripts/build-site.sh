#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
rm -rf "$ROOT/site-dist"
mkdir -p "$ROOT/site-dist"
tar --exclude='./site-dist' --exclude='./.git' -cf - -C "$ROOT" . | tar -xf - -C "$ROOT/site-dist"
echo "Static site copied to site-dist/"
