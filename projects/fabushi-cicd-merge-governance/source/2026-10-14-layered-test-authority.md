# FCM-027 — Latest explicit testing authority

On 2026-10-14 the user explicitly instructed execution of the attached proposal,
with emphasis on test accounts. Original text: 2026-10-14-next-generation-testing.txt.
This supersedes conflicting FCM-023/024/026 no-test clauses for this program.
L1/L2 are automatic PR gates; L3 follows merge/on demand; L4 follows impact;
L5 uses real packaged apps and official MCP before formal acceptance; L6 runs
nightly/on security changes. All executable verification runs in Actions.
Missing service/device/configuration is blocked, never PASS.

Routine CI must never mutate production users or use privileged TestAccount.
Backend orchestrates per-run users through ordinary Core authentication with
independent test resources, OIDC, quota and verified cleanup/TTL.

Canonical split ownership supersedes the proposal's historical repository map:
control plane is fabushi-governance; native mobile owners are bhrumom/fabushi-ios
and bhrumom/fabushi-android. Legacy fabushi receives migration/safety cleanup only.
Existing tests, protected integration, signing, provenance and resource safety
remain. Fast test artifacts disclose unfinished formal acceptance. Model
declarations and session completion are insufficient. Full DoD: FCM-027 task.
