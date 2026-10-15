# FCM-027 — Layered testing, isolated identities and trustworthy release evidence

Project: FAB-P0003 / FCM
Status: active; no completion claim
Owner: canonical fabushi-governance control plane; implementation in split repos
Updated: 2026-10-15

## 1. Context / 2. Goal
User says “按这个方案去执行，特别是测试账号那里” and supplies the full
next-generation testing proposal. This is explicit authority for automated
layered testing, superseding conflicting FCM-023/024/026 clauses. Existing CI
only proves a no-test statement; routine account provisioning writes production.
Goal: real isolated accounts and trustworthy exact-source quality gates, then
cross-platform official-MCP packaged acceptance. Full attached text is preserved
in source/2026-10-14-next-generation-testing.txt.

## 3. Non-goals
No product implementation in migrated legacy paths, production account deletion,
untrusted-PR secret exposure, branch-protection bypass or local test/build.

## 4. Requirements
- FCM27-R1: Actions is the only test/build execution platform for this program.
  L1 unit/property and L2 contracts are automatic PR/merge-group fast gates;
  L3 integration runs after merge/on demand; L4 application components follow
  impact; L5 packaged official-MCP E2E is manual before formal acceptance;
  L6 fault/security runs nightly and on security changes.
- FCM27-R2: Independent validator rejects missing, skipped, cancelled, failed,
  zero-test, stale-SHA, wrong-suite/version or duplicate required results.
  Policy/configuration success is never called product behavior success.
- FCM27-R3: Backend factory uses OIDC and ordinary Core authentication with
  run/attempt/scenario identities, A/B/C users, short-lived credentials,
  non-production resources, quota, cleanup and independent TTL janitor. Disable
  routine production D1 provisioning in active and legacy control-plane copies.
- FCM27-R4: Formal evidence locks canonical Desktop/Backend/Core/iOS/Android
  repository SHA, protocol/suite version, Actions run id and package SHA256.
  Revalidate changed dependencies; require signing, SBOM and attestation.
- FCM27-R5: Same-account discovery and real calls, cross-account denial, explicit
  consent, revocation and cleanup require independent machine assertions.
  ci_session_finish or model assertion alone is insufficient.
- FCM27-R6: Preserve all existing valuable canonical suites. Test artifact lane
  remains fast and labeled NOT_VERIFIED for unfinished formal acceptance.
  PR P95 target <=10min is measured, not claimed from a single run.

## 5. Current / 6. Target
Current split ownership differs from proposal: fabushi-governance is control plane;
canonical mobile repositories are bhrumom/fabushi-ios and bhrumom/fabushi-android.
Legacy fabushi remains source history. Target P0..P4 is adopted here, implemented
per owner; no green legacy policy gate qualifies a current product release.

## 7. Architecture
Governance owns evidence validator and normative policy. Backend owns isolated
factory/service deployment. Core owns actual auth/permissions/contracts. Desktop
and native platforms own apps and device lifecycle. No second identity issuer.
Use repository-owned expected requirements, not report-declared requirements.

## 8. Evidence contract
Manifest: version=1, repositories[{repository,sourceSha}], suites[{id,version,
repository,requiredAssertions}], artifacts[{repository,sourceSha,sha256}].
Report: sourceSha/runId/runAttempt, results[{id,version,repository,sourceSha,
runId,status,testCount,assertions}]. Each required assertion status must be PASS.
Artifact digest format is necessary but not signature/attestation evidence.
Validator accepts only an explicitly expected suite set; extra entries fail.

## 9. Constraints / 10. Failure modes
No persistent device test/cache. No production credentials in routine CI.
Absent service/device/signing/OS configuration is blocked, never pass. A failed
cleanup blocks account acceptance even when test assertions passed. Exceptions
require newer explicit user authority and honest evidence, never silent waiver.

## 11. Plan and ownership
| Phase | Delivery | Owner | Exit evidence |
| --- | --- | --- | --- |
| P0 | policy migration + fail-closed quality validator | Governance | exact-head Actions negative cases + protected integration |
| P1 | factory + isolated environment + unsafe provision retirement | Backend/Core + legacy cleanup | real A/B/C lifecycle, TTL, zero residual, no production binding |
| P2 | auth/device/message/MCP property/state/fault contracts | Core/Backend/platforms | per-repo exact-head suite reports |
| P3 | installed real app official-MCP deterministic E2E | Desktop/iOS/Android | package digest, independent assertions/video/device evidence |
| P4 | cross-repo RC + SBOM/attestation/sign/upgrade/canary | Governance/Backend/platforms | exact-source release evidence and rollback proof |

## 12. Verification
Actions-only adversarial evidence tests and Backend factory contracts first.
Then isolated hosted lifecycle and actual multi-device packaged workflows.
Keep contract, integration, package and deployment evidence separate.

## 13. Acceptance
AC-1: R1/R2/R6 policy and validator pass exact-head Actions.
AC-2: R3 deployed lifecycle including cancellation/TTL/cleanup and no production writes.
AC-3: R4/R5 actual cross-platform RC evidence, formal gates and rollback pass.
AC-4: changes land through protected PR integration and canonical-main readback.

## 14. Migration / rollback
Supersede only conflicting no-test clauses; preserve protected merges and resource
safety. Retire ordinary production provision workflow with explicit failure and
canonical Backend link. Do not delete historical production identities until
separately audited. Rollback stops fixture allocation, retains janitor and ledger.

## 15. Observability
Actions run/job/test counts/exit/source evidence. Never upload account/session
credentials, tokens, raw auth responses or password material. Store blocked phase
status in evidence index; stable source id FCM-027.

## 16. References
Latest user attachment persisted verbatim; root AGENTS.md; project SOT and dated
FCM-023/024/026 sources; Backend isolated-ci-account-factory spec and canonical
Core account.rs. No source-memory assumptions used as acceptance evidence.

## 17. Compliance
| Requirement / AC | Status | Evidence / reason |
| --- | --- | --- |
| R1/R2/R6 / AC-1 | blocked | Actions verification pending |
| R3 / AC-2 | blocked | Isolated service/resources/mailbox/janitor not configured; retirement pending |
| R4/R5 / AC-3 | blocked | Real apps/devices/package/RC/signing/SBOM/attestation not yet verified |
| AC-4 | blocked | Protected PR integration pending |

## Migration prerequisite — missing portfolio validator

FCM27-R7: The migrated governance workflow invokes
scripts/check-project-portfolio.py, but main lacks that file. Restore the exact
existing validator from legacy source 7f2935500cec3a199caf7823557ce5d106e051f4;
do not bypass the workflow or relax immutable project IDs. Actions must run its
existing registry/folder/baseline checks. No new project ID is allocated. The
legacy validator is the reused implementation; no new framework is introduced.

R7 acceptance is blocked until exact-head Project portfolio governance passes.

## Foundation evidence / requirement review (2026-10-14)

| Criterion | Status | Evidence / remaining obligation |
| --- | --- | --- |
| FCM27-R1 | blocked | Six-layer policy adopted; canonical L3/L4/L5/L6 consumer rollout remains outstanding |
| FCM27-R2 | passed | 21 adversarial evidence tests, exact-head Actions 38593913090; missing/skipped/cancelled/zero/stale/duplicate/incomplete cases reject |
| FCM27-R3 | blocked | Backend PR 70 factory contracts pass; hosted fixture infrastructure/TTL and real platform consumers remain; production provision retired on this branch |
| FCM27-R4 | blocked | Exact-source manifest validator foundation exists; real RC/SBOM/attestation/signatures remain |
| FCM27-R5 | blocked | No real packaged multi-device official-MCP report yet |
| FCM27-R6 | passed | Existing canonical product suites preserved; governance CI explicitly reports formal product acceptance NOT_VERIFIED |
| FCM27-R7 | passed | Restored original 299-line validator unchanged; exact-head portfolio Actions 38593912966 passes |
| AC-1 | blocked | Validator/policy foundation verified; full required consumer gate rollout remains |
| AC-2 | blocked | Hosted isolated lifecycle and consumer migration incomplete |
| AC-3 | blocked | Cross-platform release acceptance remains |
| AC-4 | blocked | Integration and canonical readback pending |

Source revision: a88811064fe5c63c4a94cdff54bcc01a1a17fe41.
PR: https://github.com/bhrumom/fabushi-governance/pull/3.
Actions: https://github.com/bhrumom/fabushi-governance/actions/runs/38593913090
and https://github.com/bhrumom/fabushi-governance/actions/runs/38593912966.
Governance contracts are not product test evidence. No program closure declared.

## Hosted auth slice evidence (2026-10-15)

This record supersedes the earlier claim that isolated cloud resources are not
configured. Backend runtime f6dbe6417b6252fdbbfb01bbd4b093ab2b7ae592 and Core
f781e6c85375ba0945aa4fd4c19ead89e396dfdb are deployed to two dedicated test
Workers with independent ACCOUNT_DB/PLATFORM_DB and signing/bridge keys. The
ci-isolated GitHub environment permits main only; the user authorized the dedicated
Cloudflare deployment token, expiring 2026-10-22. No production bindings are used.

- Backend contracts/workerd probe: 38666607783, 65/65, exit 0.
- Canonical wasm/emulated-D1 compatibility: 38666607691, 15 assertions, exit 0.
- Actual cloud delivery: 38666610725, 16 assertions, exit 0. It proves normal
  A/B/C code registration/password login, wrong-code refusal, A dual sessions,
  independent users, cross-account password rejection, refresh/revocation,
  explicit cleanup, subsequent re-registration, real 15-minute abandoned-client
  TTL and independent actual D1 auth-table remaining=0.
- Literal cancellation: 38668206894 actually cancelled; observer 38668322225
  attempt 2 PASS, exit 0. Independent owned-row counts are 36 before expiry and
  0 after expiry. The observer
  never calls cleanup/sweep. Earlier observer attempt failed closed before the
  cancellation conclusion settled; it is not passing evidence.

Backend hosted-ci-account-factory.md contains the HAF/HAC requirement review,
actual deployment IDs, compiled wasm digest and operating procedure. Documentation
commits do not claim a new deployment source. The source/run bindings above are
immutable; later executable changes require new verification.

| Criterion | Status | Evidence / remaining obligation |
| --- | --- | --- |
| FCM27-R1 | blocked | Foundation and auth L1/L2/L3 active in Actions; full platform L3/L4/L5/L6 adoption remains |
| FCM27-R2 | passed | Governance 21 negative evidence contracts recorded above; Backend independent runtime/cloud validators reject wrong source/assertions/residuals |
| FCM27-R3 | blocked | Hosted auth and abandoned-client TTL passed; literal cancellation passed (36 to 0); actual device/MCP fixture consumers and data cleanup remain |
| FCM27-R4 | blocked | Cross-platform RC, actual packages, signing/SBOM/attestation not verified by auth deployment |
| FCM27-R5 | blocked | Real packaged device discovery/consent/control/revocation/cleanup requires independent official-MCP acceptance |
| FCM27-R6 | passed | Existing canonical suites preserved; auth-only evidence explicitly excludes formal acceptance |
| FCM27-R7 | passed | Earlier restored portfolio validator/Actions evidence unchanged |
| AC-1 | blocked | Foundation evidence remains valid; complete consumer gate rollout outstanding |
| AC-2 | blocked | Auth cloud gate passed; literal cancellation passed; full fixture consumer migration remains |
| AC-3 | blocked | Cross-platform release/rollback acceptance remains |
| AC-4 | blocked | Foundation and hosted-auth evidence PRs merged/read back (Backend PR 82; Governance PR 4); full cross-repository consumer/release integration remains |

SMTP is NOT_VERIFIED: isolated @ci.invalid receiver carries the actual canonical
code, without bypassing normal validation/password/session algorithms. Physical
Mac/Windows/iOS/Android applications and MCP/device-created data are NOT_VERIFIED
by this auth-only slice. Full P0..P4 is not declared complete.

https://github.com/bhrumom/fabushi-backend/actions/runs/38666610725
https://github.com/bhrumom/fabushi-backend/actions/runs/38668206894
https://github.com/bhrumom/fabushi-backend/actions/runs/38668322225
