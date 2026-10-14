import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQualityEvidence, tapEvidence } from './quality-evidence.mjs';
const sourceSha = 'a'.repeat(40);
const expected = { version: 1, repositories: [{ repository: 'bhrumom/fabushi-backend', sourceSha }], suites: [{ repository: 'bhrumom/fabushi-backend', id: 'accounts', version: '1', requiredAssertions: ['crossAccountIsolation', 'cleanup'] }] };
const report = { version: 1, results: [{ repository: 'bhrumom/fabushi-backend', id: 'accounts', version: '1', sourceSha, runId: '123', runAttempt: '1', status: 'PASS', exitCode: 0, testCount: 3, failed: 0, skipped: 0, cancelled: 0, assertions: { crossAccountIsolation: 'PASS', cleanup: 'PASS' } }] };
test('exact source and required assertions pass; formal release remains unverified', () => assert.deepEqual(validateQualityEvidence(expected, report), { status: 'PASS', scope: 'declared-suite-evidence', formalRelease: 'NOT_VERIFIED', suites: 1 }));
for (const change of [{ status: 'SKIPPED' }, { status: 'CANCELLED' }, { status: 'FAIL' }, { status: 'NOT_VERIFIED' }, { testCount: 0 }, { testCount: '3' }, { exitCode: 1 }, { skipped: 1 }, { cancelled: 1 }, { failed: 1 }, { sourceSha: 'b'.repeat(40) }, { version: '2' }, { runId: '' }, { runAttempt: '0' }, { assertions: { crossAccountIsolation: 'PASS' } }, { assertions: { crossAccountIsolation: 'PASS', cleanup: 'FAIL' } }, { assertions: { crossAccountIsolation: 'PASS', cleanup: 'PASS', invented: 'PASS' } }]) {
  test(`required evidence rejects ${JSON.stringify(change)}`, () => assert.throws(() => validateQualityEvidence(expected, { ...report, results: [{ ...report.results[0], ...change }] })));
}
test('missing, unexpected and duplicate suites reject overall PASS', () => {
  for (const results of [[], [report.results[0], report.results[0]], [{ ...report.results[0], id: 'different' }]]) assert.throws(() => validateQualityEvidence(expected, { version: 1, overall: 'PASS', results }));
  assert.throws(() => validateQualityEvidence({ ...expected, suites: [] }, { version: 1, results: [] }));
});
test('malformed, duplicate and wrong-source manifests/artifacts fail', () => {
  assert.throws(() => validateQualityEvidence({ ...expected, repositories: [{ repository: 'bhrumom/fabushi-backend', sourceSha: 'bad' }] }, report));
  assert.throws(() => validateQualityEvidence({ ...expected, repositories: [...expected.repositories, ...expected.repositories] }, report));
  assert.throws(() => validateQualityEvidence({ ...expected, suites: [...expected.suites, ...expected.suites] }, report));
  assert.throws(() => validateQualityEvidence({ ...expected, artifacts: [{ repository: 'bhrumom/fabushi-backend', sourceSha: 'b'.repeat(40), sha256: 'c'.repeat(64) }] }, report));
});
const tap = '# tests 2\n# pass 2\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n';
test('TAP counts reject failed/absent/zero suites', () => {
  const metadata = { sourceSha, runId: '123', runAttempt: '1' };
  assert.equal(tapEvidence(tap, metadata).testCount, 2);
  for (const input of ['', tap.replace('# pass 2', '# pass 1'), tap.replace('# fail 0', '# fail 1'), tap.replace('# skipped 0', '# skipped 1'), tap + '# tests 2\n', tap.replaceAll('2', '0')]) assert.throws(() => tapEvidence(input, metadata));
});
