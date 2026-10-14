import { readFileSync, writeFileSync } from 'node:fs';
import { tapEvidence, validateQualityEvidence } from './quality-evidence.mjs';
const repository = process.env.GITHUB_REPOSITORY;
const result = tapEvidence(readFileSync('evidence/quality.tap', 'utf8'), { repository, id: 'governance-evidence-contracts', version: '1', sourceSha: process.env.GITHUB_SHA, runId: process.env.GITHUB_RUN_ID, runAttempt: process.env.GITHUB_RUN_ATTEMPT });
const expected = { version: 1, repositories: [{ repository, sourceSha: process.env.GITHUB_SHA }], suites: [{ repository, id: 'governance-evidence-contracts', version: '1', requiredAssertions: ['adversarialEvidenceContracts'] }] };
const report = { version: 1, results: [result] };
validateQualityEvidence(expected, report);
writeFileSync('evidence/expected.json', JSON.stringify(expected, null, 2));
writeFileSync('evidence/report.json', JSON.stringify(report, null, 2));
