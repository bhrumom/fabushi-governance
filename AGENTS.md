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

## CRITICAL: Standard end-to-end development lifecycle

All AI-assisted development must follow this lifecycle unless a newer explicit user instruction or an applicable repository/project specification defines a stricter or more task-specific requirement:

**Discover → Confirm Goal → Spec → Current-State Verification → Architecture → Task Decomposition → Test Design → Implement → Layered Verification → Failure/Recovery Verification → Exact-HEAD CI → Packaged Acceptance → Independent Acceptance → Spec Compliance Review → Protected Integration → Canonical-Main Verification → Release → Post-Release Smoke Test → Evidence Archive → COMPLETE**

The lifecycle is fail-closed: a later stage is not successful when a required earlier gate is incomplete, failed, stale, or unsupported by evidence. A stage may be marked not applicable only with a recorded reason.

### Stage 0 — Discover
Read repository instructions, locate the owning source of truth/Spec/tasks/decisions/contracts/evidence, and inspect the current code and live GitHub state. Do not treat chat memory, an old branch, or an old work-session summary as current state.

### Stage 1 — Confirm Goal
Record the current observable problem/requested change, target externally observable outcome, scope, non-goals, and affected architecture/protocol/schema/UI/security/performance/migration/package/release surfaces.

### Stage 2 — Spec
Read the durable Spec completely. Create or repair it before implementation if missing, stale, incomplete, or contradictory. Define requirements, edge cases, verification, acceptance criteria, and Definition of Done before coding. Use stable IDs for non-trivial work. The Spec records durable truth, not minute-by-minute development history.

### Stage 3 — Current-State Verification
Verify the canonical branch/SHA, active branch/PR head SHA, actual code/module ownership, dependency/protocol versions, conflicting work, relevant CI, current version, and published artifacts when applicable. Do not implement against an unverified repository shape.

### Stage 4 — Architecture
Derive the design from the Spec. Define ownership and runtime/process boundaries, dependency direction, interfaces, data/control flow, cancellation, timeout, retry, reconnect/resync, crash settlement, migration, and observability as applicable. Record important intentional decisions durably.

### Stage 5 — Task Decomposition
Split non-trivial work into small traceable tasks with independently verifiable outcomes and map them to requirement/acceptance IDs.

### Stage 6 — Test Design
Before implementation, define how each requirement will be proven using applicable layers:

**Static/Architecture → Unit → Contract → Integration → E2E → Regression → Failure/Recovery → Packaged App → Release/Update Acceptance**

Behavioral test scope follows the latest explicit user instruction and applicable Spec. Do not invent a behavioral release gate the user explicitly waived, and do not skip one the user or Spec explicitly requires.

### Stage 7 — Implement
Implement against the durable Spec and verified source. Stay in scope, preserve architecture boundaries, do not weaken requirements merely to make checks pass, and update the Spec/decision record before or together with intentional behavior/design changes.

### Stage 8 — Layered Verification
Run required verification from the cheapest/narrowest useful layer toward broader layers, diagnose failures at the lowest explanatory layer, and verify affected regressions. A source-level pass is not an application/package pass. Waived behavioral layers must be recorded as not run/waived, not passed.

### Stage 9 — Failure and Recovery Verification
When applicable, verify network interruption/recovery, timeout/cancel, process crash/restart, app restart, reconnect/resync, stale/duplicate events, partial failure, authentication/OAuth failure, MCP/tool failure, and migration interruption/rollback.

### Stage 10 — Exact-HEAD CI
Bind authoritative CI evidence to the exact source revision being accepted. Record the PR/branch head SHA and workflow run ID/URL. Evidence from an earlier SHA is stale after the head changes. When repository policy requires GitHub Actions or another designated runner, local results are supplementary only.

### Stage 11 — Packaged Acceptance
When required by the Spec or latest user instruction, verify the actual installable/deployable artifact: build/package, embedded binaries/resources, signing, notarization/stapling, updater metadata, checksums, install/launch, and required critical flows as applicable. A source build alone does not prove the distributed package.

### Stage 12 — Independent Acceptance
For non-trivial, release-bound, architecture-sensitive, or high-risk work, use an acceptance pass independent from implementation reasoning and compare:

**Spec ↔ Final Diff/Code ↔ Exact-Source CI ↔ Required Packaged Behavior ↔ Evidence**

Do not treat the implementation session's completion claim as proof.

### Stage 13 — Spec Compliance Review
Map every applicable requirement/acceptance criterion to `passed` with evidence, `blocked` with reason, or `not-applicable` with reason. Any intentional divergence must already be reflected in the durable Spec/decision record.

### Stage 14 — Protected Integration
Use: development branch → PR → exact-HEAD required CI → required packaged acceptance → review/independent acceptance → Spec compliance → protected merge → canonical main. Do not merge merely because code was written, pushed, or partially tested.

### Stage 15 — Canonical-Main Verification
Treat the canonical-main merge SHA as the new integrated source identity. Do not assume PR-head evidence proves the merged revision. Verify post-merge build/release workflows bind to the exact canonical-main SHA when applicable.

### Stage 16 — Release
Release only from the accepted canonical source revision and satisfy applicable version, build/package, signing/notarization, metadata, checksum, artifact/store publication, and rollback-readiness gates. A PR merge is not a release and a candidate artifact is not a completed release.

### Stage 17 — Post-Release Smoke Test
When required by the latest explicit user instruction or applicable Spec, obtain the artifact from the real distribution channel and exercise the required critical path. If behavioral testing was explicitly waived, record the waiver truthfully rather than fabricating a pass.

### Stage 18 — Evidence Archive
Preserve applicable final canonical SHA, PR/merge reference, workflow run IDs/URLs, release version/tag, artifact IDs/checksums, test reports, screenshots/video, logs/traces, migration/rollback results, and known limitations/deferred work. Detailed action history belongs in commits, PRs, task/work logs, and CI; the Spec remains focused on durable truth and final compliance/evidence references.

### Stage 19 — COMPLETE Gate
A task may be marked `COMPLETE` only when all applicable requirements and required delivery gates are satisfied and evidence-backed.

> **No Spec, No Code.**
>
> **No Evidence, No Complete.**
>
> **No required exact-source verification, No Acceptance.**
>
> **No required canonical-main packaged/release verification, No Release Complete.**

Partial implementation, a green unit suite, a successful PR build, a merged PR, or an uploaded candidate artifact is not by itself sufficient to claim end-to-end completion.


Canonical Spec-first policy: `docs/specs/spec-first-ai-development.md`.

---

## Migrated legacy governance instructions

The following migrated instructions remain applicable only where they do not conflict with the repository-ownership and Spec-first rules above.

This file is the repository-wide entrypoint. The complete pre-2026-09-16 repository instructions are preserved verbatim in `AGENTS.legacy.md` and remain mandatory except where this file explicitly supersedes a conflicting release/test rule. Project-first governance, Project IDs, project records, protected-main/PR governance, open-source-first research, local-disk safety, security, evidence integrity, and all unrelated product-specific instructions continue to apply.

For CI/CD and release work, the latest persisted requirement in `projects/fabushi-cicd-merge-governance/SOURCE_OF_TRUTH.md` and its latest dated source takes precedence over conflicting legacy E2E/release text. As of 2026-09-18, `projects/fabushi-cicd-merge-governance/source/2026-09-18-user-directed-test-and-release-authority.md` is the controlling test/release sequencing requirement.

## CRITICAL: User-directed release and testing policy

1. **Behavioral/product testing is not a default release gate.** Do not require Fabushi official MCP, E2E, smoke, regression, simulator/emulator, packaged-app journeys, or any equivalent behavioral test merely because a build is a test, beta, prerelease, formal, or stable release.
2. **Run behavioral tests only when the user explicitly asks to test.** Do not infer a test requirement from historical project records, an older release policy, prior acceptance evidence, or agent preference. If the user requests a specific test scope, run that requested scope unless the user explicitly expands it.
3. **Fabushi official MCP is optional unless explicitly requested by the user.** It may be used as a test/control surface when the user asks for MCP-based testing, but missing MCP connectivity or missing App-owned devices is not a release blocker when MCP testing was not requested.
4. **Explicit user publication authorization controls the behavioral gate.** If the user says `发布`, `可以发布`, or gives equivalent authorization for the current candidate, proceed with publication without inventing an additional MCP/E2E/behavioral-test prerequisite.
5. **Latest explicit user instruction wins on test/release sequencing.** A newer user instruction supersedes conflicting older repository text that made testing mandatory. Do not continue enforcing a historical MCP/E2E gate after the user has waived it.
6. **Automatic E2E and other long-running behavioral test workflows remain disabled by default.** Do not trigger them automatically from PR, merge-group, push, `main`, `workflow_run`, schedule, or release events unless a later explicit user instruction enables that exact test behavior.
7. **Do not silently substitute another behavioral test.** If MCP testing was not requested, do not replace it with autonomous E2E, smoke, regression, or another product-behavior suite.
8. **Release-construction and integrity checks are distinct from behavioral testing.** Source identity, version monotonicity where required by a channel, build/sign/package steps, notarization, provenance, artifact integrity, protected-branch rules, credentials/permissions, security controls, and store/platform acceptance requirements remain applicable because they construct or authorize the release rather than test product behavior.
9. **Evidence must be truthful.** When publishing without behavioral testing, record that no behavioral test was requested/run rather than implying a pass. When testing is explicitly requested, retain the relevant exact-source/run/device/test evidence appropriate to that requested scope.
10. **No local builds/tests.** The ordinary-device disk-safety rule remains in force. Build/package on GitHub Actions or another explicitly designated disposable build runner. If the user explicitly requests behavioral testing, execute it only on an appropriate allowed test surface; do not create heavy build/test caches on persistent ordinary devices.

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