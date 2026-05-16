# BioDockLab Access Policy

## 1. Access Control Principle

BioDockLab follows these principles:

1. Deny by default
2. Minimum necessary access
3. Role-based access control
4. Sensitive data masking
5. Audit everything
6. Separate clinical roles from internal product roles

---

## 2. Healthcare / Field Roles

| Role | Allowed | Restricted |
|---|---|---|
| Patient | Own explanation report, consultation preparation, consent status | Research Lab, Security Center, other patient data |
| Doctor | Patient report, doctor workspace, prescription review request | Security policy modification, platform admin settings |
| Pharmacist | Prescription review, dosage, interaction, genetic-fit summary | Research raw data, Security Center, admin settings |
| Administration / 원무 | Appointment, consent status, document processing | Diagnosis detail, prescription dosage, genetic detail |
| Researcher | Research Lab, docking experiments, de-identified data | Identifiable patient data, prescription details |
| Security | Audit logs, risk events, access policy review | Medical decision modification, prescription modification |
| Platform Admin | Full platform access | Should still be audited and protected by MFA |

---

## 3. Biogrammer Internal Job Roles

| Job Role | Allowed | Restricted |
|---|---|---|
| Bio Data Curator | Data Hub, metadata, de-identified dataset quality | Identifiable patient details |
| AI Model Operator | Model result, docking score, prediction ranking | Final clinical decision |
| Patient Explanation Designer | Patient-friendly report wording, question generation | Diagnosis/prescription decision |
| Research Workflow Engineer | Experiment pipeline, docking config, reproducibility log | Patient identifiable records |
| Clinical Workflow Coordinator | Doctor/pharmacist/admin workflow coordination | Security log deletion, unrestricted clinical data |
| Bio Security Architect | Access policy, audit logs, risk events | Medical decision or prescription change |
| Virtual Lab Developer | 3D viewer, virtual docking lab, WebGL/VR roadmap | Clinical decision and raw patient identity |

---

## 4. Data Visibility Matrix

| Data Type | Patient | Doctor | Pharmacist | Admin | Researcher | Security | Platform Admin |
|---|---|---|---|---|---|---|---|
| Own explanation report | Yes | Yes | Limited | No | No | No | Yes |
| Doctor detailed report | No | Yes | Limited | No | No | No | Yes |
| Prescription dosage | Limited | Yes | Yes | No | No | No | Yes |
| Appointment status | Yes | Yes | No | Yes | No | No | Yes |
| Consent status | Yes | Yes | Limited | Yes | Limited | No | Yes |
| De-identified research data | No | Limited | No | No | Yes | No | Yes |
| Security audit logs | No | No | No | No | No | Yes | Yes |
| Role permission matrix | No | No | No | No | No | Yes | Yes |

---

## 5. Access Denial Behavior

When access is denied:

1. Do not show restricted data.
2. Show a clear access denied screen.
3. Record audit log.
4. Generate a risk event if needed.
5. Provide return-to-dashboard action.
6. Do not expose backend error details to the user.

---

## 6. Prototype Limitation

Current prototype uses local demo accounts and localStorage.

Before commercialization, this must be replaced with:

- real authentication backend
- secure password hashing
- server-side sessions
- MFA
- organization approval workflow
- backend-enforced authorization
- patient assignment logic

