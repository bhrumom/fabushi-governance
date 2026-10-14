# Source of Truth

Canonical project record: `bhrumom/fabushi-governance` `main` → `projects/fabushi-cicd-merge-governance/`.

## Requirement sources

- `source/README.md` preserves the original CI/CD and merge-governance requirement and diagnosed cause.
- `source/2026-08-24-main-e2e-release-open-source-first.md` records the historical requirement for open-source-first startup, warm/incremental build/test, per-main packaged simulated-user E2E and E2E-gated Release publication.
- `source/2026-08-24-updater-proof-optional-clarification.md` made the previous-installed-App updater journey optional/non-blocking by default.
- `source/2026-09-16-test-first-mcp-only-formal-release.md` historically replaced automatic/E2E-gated formal acceptance with external Fabushi official MCP validation.
- `source/2026-09-16-zero-test-all-platform-prerelease.md` then removed behavioral-test gates from test/prerelease construction while keeping MCP-driven formal acceptance.
- `source/2026-09-17-ordinary-device-no-build-disk-safety.md` strengthened resource safety: ordinary/persistent devices are not build surfaces.
- `source/2026-09-18-user-directed-test-and-release-authority.md` is historical opt-in authority, superseded where conflicting by FCM-027.
- **`source/2026-10-14-layered-test-authority.md` is the latest explicit requirement:** layered automated testing and isolated accounts are authorized; original proposal and staged acceptance are persisted.

## Current release/test authority — FCM-027 (2026-10-14)

Latest source: `source/2026-10-14-layered-test-authority.md`; original user proposal
is preserved in `source/2026-10-14-next-generation-testing.txt`.

The user explicitly authorizes layered automatic testing and isolated accounts.
This supersedes conflicting FCM-023/024/026 clauses. Apply the six layers and
P0..P4 in `management/tasks/FCM-027-isolated-layered-testing.md`. Every executable
verification is Actions-only. Product tests remain in canonical product owners.
Governance CI proves evidence-validator contracts, never whole-product quality.
Ordinary CI never writes production users; missing isolated resources are blocked.
Formal acceptance requires independent exact-source/package/device evidence.
Protected integration, signing/provenance and truthful evidence remain mandatory.

## Ordinary-device resource-safety authority

1. Persistent developer machines, VPS/server hosts, production/service/MCP hosts and other non-disposable machines are control/edit/deploy surfaces only, not compiler/build/package surfaces.
2. Build, package, build-producing test, dependency-install/cache-warming, browser/E2E dependency and Docker image construction belongs on GitHub Actions or an explicitly designated disposable runner.
3. Low-space recovery must not be followed by local build/cache recreation; dispatch the build to Actions instead.
4. Deployment of already-built immutable artifacts is permitted when bounded, space-aware and rollback-safe.

## Precedence

1. Latest explicit user requirement once persisted here; currently `source/2026-10-14-layered-test-authority.md`.
2. This file and designated dated sources under `source/`; later explicit sources supersede only conflicting earlier rules.
3. Accepted ADRs and current CI/CD model docs that do not conflict with the latest source.
4. WBS, acceptance matrix, status, risk and task records.
5. Actual GitHub workflow files, rules/check results, PRs, Releases and deployment evidence for implementation facts.
6. Conversation memory.

No workflow is considered compliant merely because documentation says so; actual triggers, release behavior, and truthful evidence remain authoritative.