# Spec-first AI development

Status: active
Date: 2026-09-21
Repository: `bhrumom/fabushi-governance`
Repository scope: portfolio, migration, repository governance and cross-repository control-plane work

## Rule

**No Spec, No Code.** Read the applicable durable Spec before behavior-affecting governance implementation. If none exists, create `docs/specs/<task-name>.md` from `docs/specs/SPEC_TEMPLATE.md`.

Read-only discovery may occur first only to understand the current state and author/repair the Spec.

## Repository identity

Product implementation belongs in the canonical product repository. This repository owns governance/control-plane work. Legacy product or governance copies elsewhere do not create a second authoritative implementation location.

## Minimum Spec

Define context/problem, goal, non-goals, requirements, verified current state, target state, architecture/ownership boundaries, affected repositories/interfaces/schemas, constraints, failure modes, implementation strategy, verification, acceptance criteria/Definition of Done, migration/rollback/observability where applicable, and references/provenance.

## Lifecycle

Discover → Spec → Architecture/Plan → Implement → Verify → Spec Compliance Review → Integrate/Deliver.

For every requirement/AC, record `passed`, `blocked`, or `not-applicable` with evidence/reason. Update the durable Spec/decision record whenever the latest explicit user requirement intentionally changes scope or behavior.
