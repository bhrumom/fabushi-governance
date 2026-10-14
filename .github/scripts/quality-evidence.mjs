import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const sha = v => typeof v === 'string' && /^[a-f0-9]{40}$/.test(v);
const run = v => typeof v === 'string' && /^[1-9][0-9]{0,19}$/.test(v);
const fail = code => { throw new Error(code); };
export function validateQualityEvidence(expected, report) {
  if (expected?.version !== 1 || report?.version !== 1 || !Array.isArray(expected.suites) || !expected.suites.length || !Array.isArray(report.results)) fail('invalid_evidence_contract');
  if (!Array.isArray(expected.repositories) || !expected.repositories.length || expected.repositories.some(r => !sha(r.sourceSha) || !r.repository) || new Set(expected.repositories.map(r => r.repository)).size !== expected.repositories.length) fail('invalid_source_manifest');
  const sources = new Map(expected.repositories.map(r => [r.repository, r.sourceSha]));
  const key = s => `${s.repository}:${s.id}`;
  if (new Set(expected.suites.map(key)).size !== expected.suites.length || new Set(report.results.map(key)).size !== report.results.length) fail('duplicate_suite');
  if (report.results.length !== expected.suites.length) fail('missing_or_unexpected_suite');
  for (const suite of expected.suites) {
    if (!suite.id || !suite.version || !sources.has(suite.repository) || !Array.isArray(suite.requiredAssertions) || !suite.requiredAssertions.length || new Set(suite.requiredAssertions).size !== suite.requiredAssertions.length) fail('invalid_required_suite');
    const result = report.results.find(r => key(r) === key(suite));
    if (!result) fail('missing_required_suite');
    if (result.version !== suite.version || result.sourceSha !== sources.get(suite.repository) || !run(result.runId) || !run(result.runAttempt)) fail('source_or_version_mismatch');
    if (result.status !== 'PASS' || result.exitCode !== 0 || !Number.isSafeInteger(result.testCount) || result.testCount <= 0 || result.skipped !== 0 || result.cancelled !== 0 || result.failed !== 0) fail('required_suite_not_passed');
    if (!result.assertions || typeof result.assertions !== 'object' || Array.isArray(result.assertions) || Object.keys(result.assertions).length !== suite.requiredAssertions.length || suite.requiredAssertions.some(id => result.assertions[id] !== 'PASS')) fail('missing_or_failed_assertion');
  }
  for (const artifact of expected.artifacts || []) {
    if (artifact.sourceSha !== sources.get(artifact.repository) || !/^[a-f0-9]{64}$/.test(artifact.sha256 || '')) fail('artifact_source_mismatch');
  }
  return { status: 'PASS', scope: 'declared-suite-evidence', formalRelease: 'NOT_VERIFIED', suites: expected.suites.length };
}
export function tapEvidence(tap, metadata) {
  const number = name => {
    const matches = [...tap.matchAll(new RegExp(`^# ${name} ([0-9]+)$`, 'gm'))];
    if (matches.length !== 1) fail('missing_test_counts');
    return Number(matches[0][1]);
  };
  const tests = number('tests'), passed = number('pass'), failed = number('fail'), skipped = number('skipped'), cancelled = number('cancelled'), todo = number('todo');
  if (tests < 1 || passed !== tests || failed || skipped || cancelled || todo || /^not ok /m.test(tap)) fail('tap_tests_not_passed');
  if (!sha(metadata.sourceSha) || !run(metadata.runId) || !run(metadata.runAttempt)) fail('invalid_execution_identity');
  return { ...metadata, status: 'PASS', exitCode: 0, testCount: tests, failed, skipped, cancelled, assertions: { adversarialEvidenceContracts: 'PASS' } };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stdout.write(JSON.stringify(validateQualityEvidence(JSON.parse(readFileSync(process.argv[2], 'utf8')), JSON.parse(readFileSync(process.argv[3], 'utf8')))) + '\n');
}
