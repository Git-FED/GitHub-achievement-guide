#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p release
zip -qr release/github-newbie-guide-downloads.zip 09-downloads
printf 'Created %s\n' "$ROOT/release/github-newbie-guide-downloads.zip"
