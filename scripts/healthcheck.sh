#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

errors=0
warn() { printf "[WARN] %s\n" "$*"; }
info() { printf "[INFO] %s\n" "$*"; }
fail() { printf "[FAIL] %s\n" "$*"; errors=$((errors + 1)); }

REQUIRED_DOCS=(
  "README.md"
  "docs/PRD.md"
  "docs/PRODUCT_PRD.md"
  "docs/how-to-add-experiment.md"
  "docs/next-actions.md"
)

info "Checking required docs files..."
for path in "${REQUIRED_DOCS[@]}"; do
  if [[ -f "$path" ]]; then
    info "  OK: $path"
  else
    fail "Missing required docs file: $path"
  fi
done

info "Checking markdown links (local docs links)..."
if ! python3 - <<'PY'
from pathlib import Path
import re
import sys

repo = Path('.').resolve()

md_files = sorted(
    [p for p in repo.rglob('*.md') if '.git' not in p.parts and 'node_modules' not in p.parts]
)

link_re = re.compile(r'!?\[[^\]]*\]\(([^)]+)\)')
problems = []

for md_file in md_files:
    rel_file = md_file.relative_to(repo)
    text = md_file.read_text(encoding='utf-8', errors='ignore')

    for line_no, line in enumerate(text.splitlines(), start=1):
        for raw in link_re.findall(line):
            target = raw.strip()
            if not target:
                continue
            if target.startswith('<') and target.endswith('>'):
                target = target[1:-1].strip()

            lower = target.lower()
            if lower.startswith(('http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:')):
                continue
            if target.startswith('#'):
                continue

            target = target.split('#', 1)[0].split('?', 1)[0].strip()
            if not target:
                continue

            if target.startswith('/'):
                candidate = repo / target.lstrip('/')
            else:
                candidate = (md_file.parent / target).resolve()

            exists = candidate.exists()
            if not exists and candidate.suffix == '':
                exists = (candidate / 'README.md').exists() or (candidate / 'index.md').exists()

            if not exists:
                problems.append(f"{rel_file}:{line_no} -> broken local link target: {raw}")

if problems:
    print('[FAIL] Broken local markdown links detected:')
    for p in problems:
        print(f'  - {p}')
    print('\nAction: fix link targets or remove stale links in docs.')
    sys.exit(1)

print('[INFO] Local markdown link check passed.')
PY
then
  errors=$((errors + 1))
fi

info "Running optional markdown lint (if available)..."
if command -v markdownlint-cli2 >/dev/null 2>&1; then
  if ! markdownlint-cli2 "**/*.md"; then
    fail "markdownlint-cli2 reported issues"
  fi
else
  warn "markdownlint-cli2 not found; skipping markdown lint"
fi

if [[ "$errors" -gt 0 ]]; then
  printf "\nHealthcheck failed with %s issue(s).\n" "$errors"
  exit 1
fi

printf "\nHealthcheck passed.\n"
