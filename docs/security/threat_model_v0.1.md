# BioDockLab Threat Model v0.1

## 1. Purpose

BioDockLab is a role-based bio/clinical data explanation, research workflow, and security-audit platform prototype.

This document defines the security threats BioDockLab should consider before commercialization.

BioDockLab is not:
- an EMR replacement
- a diagnosis system
- a prescription system
- a clinical decision-making system
- a validated drug-discovery system

BioDockLab is:
- an explanation support layer
- a research workflow platform
- a role-based access control prototype
- a security/audit layer for bio/clinical data workflows

---

## 2. Assets to Protect

| Asset | Description | Sensitivity |
|---|---|---|
| Patient profile | Patient ID, masked name, appointment, consent status | High |
| Clinical report | Explanation report, genetic marker, candidate treatment summary | High |
| Prescription data | Drug, dosage, route, interaction note | Very High |
| Research dataset | Protein, ligand, docking result, experiment log | Medium to High |
| Audit logs | Who accessed what, when, and why | High |
| Consent records | Research use, report generation, third-party sharing consent | Very High |
| Access policy | Role permission matrix and restriction rules | High |

---

## 3. Main Threats

### T1. Unauthorized patient data access

**Scenario**

A user attempts to access a patient screen or report outside their allowed role.

**Example**

- Researcher tries to access identifiable patient information.
- Administration user tries to access prescription details.
- Patient tries to access Research Lab or Security Center.

**Impact**

- Privacy breach
- Loss of trust
- Compliance risk
- Unauthorized medical data exposure

**Mitigation**

- Role-Based Access Control
- Deny-by-default policy
- Audit logging for every access attempt
- Blocked access screen
- Patient data masking by role

---

### T2. Insider over-access

**Scenario**

An authorized user repeatedly accesses patient records without a clear work reason.

**Example**

- Staff repeatedly opens the same patient report.
- User accesses many patient records in a short time.
- User accesses data outside normal work pattern.

**Impact**

- Internal privacy violation
- Abuse of legitimate access
- Sensitive data leakage

**Mitigation**

- Access log monitoring
- Risk event generation
- Repeated access detection
- Access reason requirement
- Security Center review

---

### T3. Role confusion

**Scenario**

Different roles are mixed together, causing users to see data they should not see.

**Example**

- Administration sees prescription details.
- Researcher sees identifiable patient data.
- Security user sees medical content instead of logs only.

**Impact**

- Incorrect access design
- Data overexposure
- Poor commercialization readiness

**Mitigation**

- Separate healthcare roles and biogrammer job roles
- Login role locked by account
- Platform Admin manages role matrix
- Internal job roles documented separately from public login roles

---

### T4. Consent misuse

**Scenario**

Patient data is used for research or report generation without checking consent status.

**Example**

- Research dataset includes non-consented patient data.
- Third-party transfer happens without approval.
- Report generated without consent.

**Impact**

- Privacy violation
- Legal and ethical risk
- Loss of patient trust

**Mitigation**

- Consent status display
- Consent-aware dataset design
- Researcher access limited to de-identified data
- Third-party transfer disabled by default

---

### T5. Report leakage

**Scenario**

A PDF or explanation report is downloaded, copied, or shared outside the intended workflow.

**Example**

- Patient report file shared externally.
- Staff downloads report without reason.
- Generated report contains too much sensitive information.

**Impact**

- Sensitive clinical information leakage
- Secondary data exposure
- Uncontrolled redistribution

**Mitigation**

- Download audit log
- Report watermarking in future version
- Time-limited report links in future version
- Role-specific report masking
- Minimal necessary information principle

---

### T6. Account sharing

**Scenario**

One account is shared by multiple people.

**Example**

- Shared station account in hospital/office.
- Student or staff uses another person's account.
- Password is reused or leaked.

**Impact**

- Audit log becomes unreliable
- Accountability failure
- Unauthorized access

**Mitigation**

- Individual accounts
- MFA for sensitive roles
- Session expiration
- Device/session logging
- Platform Admin approval workflow

---

### T7. API authorization failure

**Scenario**

Frontend blocks access, but backend API still returns restricted data.

**Example**

- User manually calls API endpoint.
- Role parameter is modified.
- Patient ID is changed in request.

**Impact**

- Backend-level data breach
- Broken access control

**Mitigation**

- Backend authorization check
- Never trust frontend role alone
- Server-side patient/role validation
- Audit middleware
- Deny-by-default response

---

### T8. Platform Admin abuse

**Scenario**

A platform administrator has too much power without monitoring.

**Example**

- Admin views all logs without reason.
- Admin changes role policies without record.
- Admin creates unauthorized accounts.

**Impact**

- High-impact insider threat
- Governance failure

**Mitigation**

- Admin action logging
- MFA required
- Separate security review role
- Admin access reason input
- Change history for permission policies

---

## 4. Role-Based Threat Summary

| Role | Main Risk | Required Control |
|---|---|---|
| Patient | Accessing non-owned data | Own-data-only policy |
| Doctor | Over-access beyond assigned patient | Assigned-patient scope |
| Pharmacist | Seeing unnecessary clinical/research data | Prescription-scope access |
| Administration | Seeing diagnosis/prescription details | Masking and minimal access |
| Researcher | Seeing identifiable patient data | De-identification |
| Security | Seeing clinical content unnecessarily | Logs-only access |
| Platform Admin | Excessive global power | MFA, audit, change history |

---

## 5. Current Prototype Controls

Implemented in current prototype:

- Role-based login
- Role-locked session
- Separate screens by role
- Access denied screen
- Audit log creation
- Security Center
- Risk event display
- Role permission matrix
- Platform Admin Console
- Proprietary / All Rights Reserved notice

---

## 6. Future Security Controls

Needed before real commercialization:

- Real authentication backend
- Password hashing
- MFA / two-factor authentication
- Institution approval workflow
- Assigned patient scope
- Consent verification middleware
- Download tracking
- Report watermarking
- Data encryption at rest
- Secret/key management
- Admin change history
- Security monitoring dashboard
- Penetration testing
- Privacy impact assessment

---

## 7. Claim Boundary

BioDockLab must not claim to:
- diagnose disease
- prescribe medication
- determine treatment
- replace clinicians
- replace wet-lab validation
- replace animal or clinical trials
- replace hospital EMR systems

BioDockLab may claim to:
- support explanation workflows
- support research workflow management
- visualize bio data
- manage experiment records
- demonstrate role-based access control
- support security audit concepts

