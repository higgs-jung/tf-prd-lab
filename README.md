# tf-prd-lab

Private sandbox repo to test the OpenClaw team workflow (Planner → Captain → Worker → Judge) with PR-based automation.

## Documentation entrypoint

- Start here: [docs/INDEX.md](./docs/INDEX.md)
- Ideation SSOT: [docs/ideation/INDEX.md](./docs/ideation/INDEX.md)
- Project overview: [About page](/about)

## Repo healthcheck

Run the lightweight repository checks locally:

```bash
pnpm healthcheck
```

What it checks:
- required docs files exist
- local markdown links resolve
- optional markdown lint (`markdownlint-cli2`) when available

CI also runs the same check on pull requests and pushes to `main` via `.github/workflows/healthcheck.yml`.
