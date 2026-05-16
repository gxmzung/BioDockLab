# BioDockLab Commercial Security Checklist

## 1. Authentication

- [ ] Real login backend
- [ ] Password hashing
- [ ] MFA for doctors, pharmacists, researchers, security, platform admin
- [ ] Account lockout after repeated failed login
- [ ] Session expiration
- [ ] Device/session tracking

---

## 2. Authorization

- [ ] Server-side RBAC
- [ ] Patient assignment-based access
- [ ] Deny-by-default API policy
- [ ] Role permission matrix management
- [ ] Platform Admin approval workflow
- [ ] Admin change history

---

## 3. Patient Data Protection

- [ ] Patient ID masking
- [ ] Name masking
- [ ] Diagnosis detail masking by role
- [ ] Prescription dosage masking by role
- [ ] Genetic data masking by role
- [ ] Minimum necessary data display

---

## 4. Consent Management

- [ ] Consent status tracking
- [ ] Research-use consent
- [ ] Report-generation consent
- [ ] Third-party transfer consent
- [ ] Consent change history
- [ ] Consent-aware dataset generation

---

## 5. Audit Logging

- [ ] Login logs
- [ ] Screen access logs
- [ ] API access logs
- [ ] Report download logs
- [ ] Blocked access logs
- [ ] Admin action logs
- [ ] Policy change logs

---

## 6. Risk Detection

- [ ] Repeated patient record access detection
- [ ] Access outside working role
- [ ] Large volume lookup detection
- [ ] Unusual login location/device
- [ ] Admin privilege misuse detection
- [ ] Report export anomaly detection

---

## 7. Data Security

- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] Secret management
- [ ] Environment variable separation
- [ ] Backup encryption
- [ ] Key rotation policy

---

## 8. Report Security

- [ ] Watermarked PDF
- [ ] Expiring report links
- [ ] Download audit log
- [ ] Role-based report masking
- [ ] External sharing warning
- [ ] Patient-facing claim boundary

---

## 9. Product Boundary

BioDockLab must keep these boundaries:

- [ ] Does not diagnose disease
- [ ] Does not prescribe medication
- [ ] Does not replace doctors, pharmacists, or clinical staff
- [ ] Does not replace EMR
- [ ] Does not claim validated drug discovery
- [ ] Does not replace wet-lab or clinical trials

---

## 10. Commercialization Readiness

Before commercialization:

- [ ] Legal review
- [ ] Privacy review
- [ ] Security architecture review
- [ ] Medical claim review
- [ ] Patent/IP review
- [ ] Institutional pilot agreement
- [ ] Data processing agreement
- [ ] Incident response plan

