# BioDockLab Implementation Roadmap

## 1. Roadmap Purpose

This document defines the implementation order for BioDockLab.

BioDockLab is not a diagnosis, prescription, or EMR replacement system.  
It is a role-based healthcare and bio-data explanation, workflow, research, and security audit prototype.

---

## 2. Priority 1 — Expert Review Stabilization

Goal:

- Collect professor, nurse, doctor, pharmacist, and security feedback.
- Remove risky medical wording.
- Confirm role-based data access assumptions.

Tasks:

- Review Patient View wording.
- Review Nurse Workspace workflow.
- Review Doctor, Pharmacist, Administration views.
- Review Security Center and audit log assumptions.
- Summarize US healthcare advisor feedback.

Deliverables:

- `docs/review/expert_feedback_summary.md`
- `docs/review/medical_expression_risk_list.md`
- `docs/review/us_healthcare_advisor_notes.md`

---

## 3. Priority 2 — Role-Based MVP Scope

Goal:

- Define what belongs in v1.0 Review MVP.
- Separate current implementation screens from concept screens.
- Keep diagnosis, prescription, and treatment recommendation out of scope.

Tasks:

- Finalize role list.
- Finalize role screen boundaries.
- Define allowed and restricted data per role.
- Update MVP scope document.

Deliverables:

- `docs/product/MVP_SCOPE.md`
- `docs/product/ROLE_SCREEN_SPEC.md`
- `docs/product/SAFE_MEDICAL_WORDING.md`

---

## 4. Priority 3 — Backend RBAC and Audit Log

Goal:

- Move access control from UI-only prototype to backend-enforced policy.
- Store audit logs and unauthorized access events.

Tasks:

- Define auth module.
- Define user-role model.
- Define access policy model.
- Store audit logs.
- Store risk events.
- Add smoke tests.

Deliverables:

- `docs/security/RBAC_POLICY.md`
- `docs/security/AUDIT_LOG_SPEC.md`
- `scripts/mvp_smoke_test.py`

---

## 5. Priority 4 — Role-Based Clinical Workspaces

Goal:

- Stabilize role-specific screens using expert feedback.

Screens:

- Patient View
- Nurse Workspace
- Doctor Workspace
- Pharmacist Workspace
- Administration View
- Research Lab
- Security Center
- Platform Admin Console

Deliverables:

- `docs/product/ROLE_FEATURE_MATRIX.md`
- `docs/demo/MVP_DEMO_FLOW.md`

---

## 6. Priority 5 — Research Lab and Protein Atlas

Goal:

- Build education and research-oriented bio-data features.

Scope:

- Protein cards
- Mutation/disease/ligand links
- Virtual docking sample flow
- Glossary
- Research Lab connection

Deliverables:

- `docs/research/PROTEIN_ATLAS_SPEC.md`
- `docs/research/VIRTUAL_DOCKING_LAB_SPEC.md`
- `sample_data/protein_atlas.json`

---

## 7. Priority 6 — Case Match and Care Connect Concept

Goal:

- Define future expansion safely.
- Position it as consultation preparation and telehealth matching, not self-diagnosis.

Scope:

- Case Match
- Care Connect
- Pre-visit intake
- Online consultation matching
- Emergency red-flag routing

Deliverables:

- `docs/product/CASE_MATCH_CONCEPT.md`
- `docs/product/CARE_CONNECT_CONCEPT.md`
- `docs/legal/TELEHEALTH_RISK_NOTES.md`

---

## 8. Priority 7 — Privacy and Security Documentation

Goal:

- Prepare documentation before any real patient data is considered.

Deliverables:

- `docs/security/PRIVACY_DATA_FLOW.md`
- `docs/security/INSIDER_THREAT_MODEL.md`
- `docs/security/COMPLIANCE_CHECKLIST.md`

---

## 9. Priority 8 — Pilot Proposal Package

Goal:

- Prepare review/pilot proposal materials.

Deliverables:

- Final pitch deck
- Demo runbook
- Expert feedback log
- Pilot proposal draft
- Product one-pager

---

## 10. Out of Scope for First 6 Months

The following are excluded from the first 6-month MVP plan:

- Real patient data collection
- Actual diagnosis
- Actual prescription
- Treatment recommendation
- Insurance billing integration
- Direct EMR/HIS/OCS integration
- Real telehealth operation
- Real clinical decision-making
