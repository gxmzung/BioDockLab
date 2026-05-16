# BioDockLab Demo Runbook

## Local Run

Backend:
cd ~/Documents/001.개발/BioDockLab
source .venv/bin/activate
uvicorn backend.main:app --reload

Frontend:
cd ~/Documents/001.개발/BioDockLab/frontend
python3 -m http.server 5500

Open:
http://127.0.0.1:5500/clinical_v3.html

## Demo Accounts

patient@biodocklab.local / 1234
doctor@biodocklab.local / 1234
pharmacist@biodocklab.local / 1234
admin@biodocklab.local / 1234
researcher@biodocklab.local / 1234
security@biodocklab.local / 1234
owner@biodocklab.local / 4748

## Demo Flow

1. Login as patient and show Patient View.
2. Try Research Lab as patient and confirm access denied.
3. Login as pharmacist and show prescription review.
4. Login as admin_staff and show masking.
5. Login as researcher and show Research Lab.
6. Login as security and show audit logs.
7. Login as platform admin and show Admin Console.

## Smoke Test

python3 scripts/smoke_test.py

Expected:
ALL TESTS PASSED
