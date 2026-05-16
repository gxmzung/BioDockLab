# BioDockLab Role Matrix

## Repository / IP Status

- Repository visibility: Private
- License status: Proprietary
- Copyright: All Rights Reserved
- Commercial use, redistribution, productization, or derivative use is prohibited without explicit written permission.
- BioDockLab is not an EMR replacement and does not provide diagnosis, prescription, or clinical decision-making.

## Platform Admin

| Role | Email | Password | Permission |
|---|---|---|---|
| Platform Admin | owner@biodocklab.local | 4748 | Full platform access |

## Healthcare / Field Roles

| Role | Email | Password | Main Scope |
|---|---|---|---|
| Patient | patient@biodocklab.local | 1234 | Own explanation report and consent status |
| Doctor | doctor@biodocklab.local | 1234 | Patient summary, reports, prescription review request |
| Pharmacist | pharmacist@biodocklab.local | 1234 | Dose, drug interaction, genetic fit review |
| Administration / 원무 | admin@biodocklab.local | 1234 | Appointment, consent, documents, masked data only |
| Researcher | researcher@biodocklab.local | 1234 | Research lab, docking workflow, de-identified data |
| Security | security@biodocklab.local | 1234 | Audit logs, risk events, access control review |

## Biogrammer Job Roles

| Job Role | Email | Password | Main Scope |
|---|---|---|---|
| Bio Data Curator | curator@biodocklab.local | 1234 | Bio data cleaning, metadata, de-identified dataset quality |
| AI Model Operator | ai@biodocklab.local | 1234 | AI prediction, docking score analysis, model result review |
| Patient Explanation Designer | explain@biodocklab.local | 1234 | Patient-friendly report, consultation questions, claim-boundary wording |
| Research Workflow Engineer | workflow@biodocklab.local | 1234 | Experiment pipeline, docking logs, reproducibility management |
| Clinical Workflow Coordinator | clinical@biodocklab.local | 1234 | Doctor/pharmacist/admin workflow coordination |
| Bio Security Architect | biosecurity@biodocklab.local | 1234 | RBAC, consent, audit logs, insider-risk detection |
| Virtual Lab Developer | virtuallab@biodocklab.local | 1234 | 3D molecular viewer, virtual docking lab, WebGL/VR roadmap |

## Product Direction

BioDockLab should be presented as a role-based bio/clinical data explanation, research workflow, and security-audit layer. It should not be described as replacing hospital EMR systems or making medical decisions.


---

## v0.4 Login Role Policy

The login screen should expose only actual platform user roles:

- Patient
- Doctor
- Pharmacist
- Administration / 원무
- Researcher
- Security

The Platform Admin account is intentionally hidden from demo buttons and must log in with email/password only:

- owner@biodocklab.local / 4748

Biogrammer job roles should remain in the internal role matrix and administrator documentation, not as first-screen login buttons:

- Bio Data Curator
- AI Model Operator
- Patient Explanation Designer
- Research Workflow Engineer
- Clinical Workflow Coordinator
- Bio Security Architect
- Virtual Lab Developer
