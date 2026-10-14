# Fabushi Governance — Agent Instructions

These instructions apply repository-wide to AI-assisted development in `bhrumom/fabushi-governance`.

## CRITICAL: Repository ownership

This repository is the canonical source for **Fabushi portfolio, migration, repository-governance and cross-repository control-plane records**.

- Product implementation belongs in its canonical product repository, not here.
- `bhrumom/fabushi` is the legacy migration/source-history repository; this governance repository owns the separated governance control-plane copy.
- Before editing, verify whether the task is governance/migration control-plane work or a product task that must be routed elsewhere.

## CRITICAL: Spec-first development — No Spec, No Code

Before changing governance automation, workflows, schemas, policies, migration tooling, repository controls, or other behavior-affecting files:

1. Read this root `AGENTS.md`.
2. Read the applicable durable Spec/project/source-of-truth and task records.
3. Check `docs/specs/`.
4. Reconcile the Spec with the latest explicit user requirement and live GitHub facts.
5. If no usable Spec exists, or it is stale/unclear/contradictory, create or repair it first with `docs/specs/SPEC_TEMPLATE.md`.

Read-only investigation needed to understand the current state or write the Spec is allowed before the Spec is complete. Implementation is not.

Mandatory lifecycle: **Discover → Spec → Architecture/Plan → Implement → Verify → Spec Compliance Review → Integrate/Deliver**.

Before completion, map each requirement/acceptance criterion to `passed`, `blocked`, or `not-applicable` with evidence/reason.

Canonical Spec-first policy: `docs/specs/spec-first-ai-development.md`.

---

## Migrated legacy governance instructions

The following migrated instructions remain applicable only where they do not conflict with the repository-ownership and Spec-first rules above.

This file is the repository-wide entrypoint. The complete pre-2026-09-16 repository instructions are preserved verbatim in `AGENTS.legacy.md` and remain mandatory except where this file explicitly supersedes a conflicting release/test rule. Project-first governance, Project IDs, project records, protected-main/PR governance, open-source-first research, local-disk safety, security, evidence integrity, and all unrelated product-specific instructions continue to apply.

For CI/CD and release work, the latest persisted requirement in `projects/fabushi-cicd-merge-governance/SOURCE_OF_TRUTH.md` and its latest dated source takes precedence over conflicting legacy E2E/release text. As of 2026-10-14, FCM-027 is the controlling testing migration requirement; older sources remain historical where conflicting.

## CRITICAL: FCM-027 layered testing authority (2026-10-14)

The user explicitly authorized the attached next-generation test system and
isolated account migration. The governing source is
`projects/fabushi-cicd-merge-governance/source/2026-10-14-layered-test-authority.md`.
It supersedes conflicting FCM-023/024/026 no-test rules for this program.

- Run L1/L2 fast tests automatically on affected PR/merge candidates; L3 on merge
  or demand, L4 by impact, L5 real packaged-app/official-MCP formal acceptance,
  and L6 nightly/security-change verification according to the FCM-027 rollout.
- All executable verification for this program runs only in GitHub Actions.
- Ordinary CI uses isolated run/attempt/scenario accounts through canonical Core
  authentication, never production D1 writes or privileged TestAccount shortcuts.
- Missing/cancelled/skipped/zero-test/stale-source required evidence is blocked.
  Model declarations or ci_session_finish are not business acceptance evidence.
- Preserve protected integration, integrity, signing and truthful evidence. A fast
  test artifact must disclose any unfinished formal acceptance.
- Product implementation stays in each canonical split repository. Migration
  safety cleanup of legacy workflows remains valid here only as archival work.

## CRITICAL: Ordinary devices are control/edit surfaces, never build surfaces

1. **Never compile, build, package, or run build-producing tests on an ordinary/persistent device.** An ordinary device is any long-lived developer workstation, personal Mac/Windows computer, VPS/server, production/service host, MCP host, or other machine not explicitly provisioned as a disposable build runner. This explicitly includes persistent hosts such as `bhrum2`.
2. **Disk-consuming toolchains belong only on GitHub Actions or an explicitly designated disposable build runner.** Do not run `cargo build/check/test`, Gradle/Android builds, Xcode builds, `npm`/`pnpm`/`yarn` build/test flows, Electron packaging, Docker image builds, browser/E2E dependency installs, native packaging, or equivalent compiler/package pipelines on ordinary devices.
3. **Do not populate large build/dependency caches on ordinary devices.** Do not create or warm large `target/`, `node_modules/`, Gradle, DerivedData, emulator/simulator, Playwright/browser, Docker-build, package-manager, compiler, or duplicated full-worktree caches merely to validate or build a change. Do not install/download large build dependencies there when the same work can run on Actions.
4. **Allowed ordinary-device work is low-footprint control-plane work only.** Source inspection, `git fetch/show/status/diff`, small text edits, GitHub/API orchestration, reading logs, service health checks/restarts, and deploying already-built bounded artifacts are allowed. Small static/text/config checks such as `git diff --check` are allowed only when they do not compile code, install dependencies, or materially grow disk usage.
5. **If compilation or artifact construction is required, dispatch it to Actions instead of making space locally.** Low disk space is a stop signal, not a reason to delete files and then continue a local build. Cleaning a persistent host may restore service health, but must not be followed by build/cache recreation on that host.
6. **Persistent-host deployments must remain bounded and rollback-safe.** Reuse already-built immutable artifacts, inspect free space before staging material artifacts, avoid duplicate copies when possible, and remove superseded temporary/staging data after successful atomic activation. Never sacrifice service/database/source data to make room for a build.
7. **No implicit exception.** A local/persistent build is allowed only when the user explicitly designates that specific machine as a disposable build runner for that task. Otherwise fail closed and move the build to GitHub Actions.

## CRITICAL: Completion semantics for release work

For application-affecting tasks, merge and canonical-main readback remain required when the task calls for a repository merge. Publication completion follows the user's explicit instruction: when the user authorizes publication, the release may proceed once the required non-behavioral release-construction/platform constraints are satisfied. Behavioral-test evidence is required only when the user explicitly requested behavioral testing for that candidate. Missing MCP/E2E evidence is not, by itself, a blocker unless the user asked for that test.

All non-conflicting instructions in `AGENTS.legacy.md` remain mandatory.