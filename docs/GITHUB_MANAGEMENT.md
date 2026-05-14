# GitHub Management Guide

## Branch Strategy

| Branch | Purpose |
|---|---|
| main | Stable version for presentation and submission |
| dev | Integrated development branch |
| feature/* | Feature-specific development |
| docs/* | Documentation work |
| experiment/* | Experimental workflow |

## Commit Message Rule

```txt
docs: document changes
feat: new feature
fix: bug fix
chore: setup or maintenance
refactor: code structure improvement
experiment: experiment result or prototype
```

## Example Commits

```bash
git commit -m "docs: add MVP specification"
git commit -m "feat: add protein viewer prototype"
git commit -m "experiment: add sample docking result log"
```

## Issue Usage

Use GitHub Issues for:

- Feature planning
- Bug tracking
- Meeting decisions
- Research tasks
- Presentation preparation

## Pull Request Rule

Before merging into `main`, check:

- README is updated if needed.
- Demo still runs.
- No unnecessary large files are included.
- Claims are not exaggerated as medical evidence.
