# Clinical UX v0.2 Test Plan

## Goal
Validate role-based UI, data masking, access logging, denied access handling, and security center visibility.

## Required Checks
1. Researcher can open Research Lab.
2. Pharmacist can open Pharmacist Workspace and see prescription review.
3. Administration can see appointments and consent status, but diagnosis/prescription details remain masked.
4. Non-security roles are blocked from Security Center.
5. Security role can view audit logs and risk events.
6. Unauthorized access attempts appear as denied logs and risk events.
