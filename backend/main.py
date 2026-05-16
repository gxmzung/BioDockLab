from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from datetime import datetime
import json
import random

app = FastAPI(title="BioDockLab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
SAMPLE_DATA_DIR = BASE_DIR / "sample_data"
EXPERIMENTS_FILE = BASE_DIR / "experiments" / "experiment_runs.json"
OUTPUT_DIR = BASE_DIR / "docking" / "outputs"
LOG_DIR = BASE_DIR / "docking" / "logs"

SAMPLE_DATA_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)
EXPERIMENTS_FILE.parent.mkdir(parents=True, exist_ok=True)

ROLE_POLICIES = {
    "patient": {"dashboard", "patient", "reports_limited", "consent_status"},
    "doctor": {"dashboard", "patient", "doctor", "reports", "prescription"},
    "pharmacist": {"dashboard", "prescription", "patient_limited", "reports_limited"},
    "admin_staff": {"dashboard", "admin", "appointments", "consent_status", "patient_limited"},
    "researcher": {"dashboard", "research_lab", "docking", "data_hub"},
    "security": {"dashboard", "security", "audit_logs", "risk_events"},
    "super_admin": {
        "dashboard", "patient", "doctor", "research_lab", "docking", "prescription",
        "admin", "appointments", "consent_status", "data_hub", "security",
        "audit_logs", "risk_events", "reports", "reports_limited", "patient_limited"
    },
    "bio_data_curator": {"dashboard", "data_hub", "reports_limited", "patient_limited"},
    "ai_model_operator": {"dashboard", "research_lab", "docking", "data_hub", "reports_limited"},
    "patient_explanation_designer": {"dashboard", "patient", "reports_limited", "consent_status"},
    "research_workflow_engineer": {"dashboard", "research_lab", "docking", "data_hub"},
    "clinical_workflow_coordinator": {
        "dashboard", "admin", "appointments", "consent_status",
        "patient_limited", "prescription"
    },
    "bio_security_architect": {"dashboard", "security", "audit_logs", "risk_events"},
    "virtual_lab_developer": {"dashboard", "research_lab", "docking", "data_hub"},
}

DEFAULT_USERS = [
    {"id": "USER-PATIENT-001", "name": "환자 사용자", "role": "patient", "role_label": "환자", "department": "Patient Portal"},
    {"id": "USER-DOCTOR-001", "name": "이준호 의사", "role": "doctor", "role_label": "의사", "department": "Doctor Workspace"},
    {"id": "USER-PHARM-001", "name": "박민지 약사", "role": "pharmacist", "role_label": "약사", "department": "Pharmacy"},
    {"id": "USER-ADMIN-001", "name": "최하늘 원무", "role": "admin_staff", "role_label": "원무", "department": "Administration"},
    {"id": "USER-RESEARCHER-001", "name": "김서연 박사", "role": "researcher", "role_label": "연구자", "department": "Research Lab"},
    {"id": "USER-SECURITY-001", "name": "보안관리자", "role": "security", "role_label": "보안", "department": "Security Center"},
    {"id": "USER-OWNER-001", "name": "이영준 관리자", "role": "super_admin", "role_label": "플랫폼 관리자", "department": "Platform Admin"},
    {"id": "USER-BIOSEC-001", "name": "바이오 보안 아키텍트", "role": "bio_security_architect", "role_label": "Bio Security Architect", "department": "Bio Security"},
    {"id": "USER-VLAB-001", "name": "가상실험실 개발자", "role": "virtual_lab_developer", "role_label": "Virtual Lab Developer", "department": "Virtual Lab"},
]

DEFAULT_RISK_EVENTS = [
    {
        "id": "RISK-001",
        "severity": "high",
        "title": "권한 밖 민감 데이터 접근 시도",
        "description": "원무 역할 사용자가 처방 상세 데이터 화면에 접근하려 했습니다.",
        "status": "needs_review",
        "recommended_action": "접근 사유 확인 및 권한 정책 점검"
    },
    {
        "id": "RISK-002",
        "severity": "medium",
        "title": "동일 환자 기록 반복 열람",
        "description": "짧은 시간 내 동일 환자 기록이 반복 조회되었습니다.",
        "status": "monitoring",
        "recommended_action": "내부자 과다열람 여부 확인"
    }
]


def load_json(path: Path, default):
    try:
        if not path.exists():
            save_json(path, default)
            return default
        raw = path.read_text(encoding="utf-8").strip()
        if not raw:
            save_json(path, default)
            return default
        data = json.loads(raw)
        return data
    except Exception:
        save_json(path, default)
        return default


def save_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def can_access(role: str, view: str) -> bool:
    return view in ROLE_POLICIES.get(role, set())


def append_audit(actor: str, role: str, action: str, resource: str, patient_id=None, allowed=True, reason=""):
    path = SAMPLE_DATA_DIR / "audit_logs.json"
    logs = load_json(path, [])
    item = {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "actor": actor,
        "role": role,
        "action": action,
        "resource": resource,
        "patient_id": patient_id,
        "allowed": allowed,
        "reason": reason
    }
    logs.append(item)
    save_json(path, logs)
    return item


def add_risk_event(title: str, description: str, severity="medium"):
    path = SAMPLE_DATA_DIR / "risk_events.json"
    events = load_json(path, DEFAULT_RISK_EVENTS)
    item = {
        "id": f"RISK-{len(events) + 1:03d}",
        "severity": severity,
        "title": title,
        "description": description,
        "status": "needs_review",
        "recommended_action": "접근권한, 접근 사유, 반복 열람 여부 확인"
    }
    events.append(item)
    save_json(path, events)
    return item


@app.get("/")
def root():
    return {
        "message": "BioDockLab Backend Running",
        "mode": "v0.7.2 clean backend",
        "claim_boundary": "research, education, explanation support, and security audit only"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/clinical/users")
def clinical_users():
    return load_json(SAMPLE_DATA_DIR / "clinical_users.json", DEFAULT_USERS)


@app.post("/security/access-check")
def access_check(payload: dict):
    role = payload.get("role", "")
    actor = payload.get("actor", "unknown")
    view = payload.get("view", "")
    patient_id = payload.get("patient_id")
    reason = payload.get("reason", "screen access")

    allowed = can_access(role, view)

    append_audit(
        actor=actor,
        role=role,
        action="ACCESS_CHECK",
        resource=view,
        patient_id=patient_id,
        allowed=allowed,
        reason=reason
    )

    if not allowed:
        add_risk_event(
            title="권한 없는 화면 접근 시도",
            description=f"{actor}({role}) tried to access {view} for patient {patient_id}",
            severity="high"
        )
        return {
            "allowed": False,
            "message": "권한이 없는 화면입니다. 보안 로그에 기록되었습니다."
        }

    return {
        "allowed": True,
        "message": "접근 허용"
    }


@app.get("/security/audit-logs")
def audit_logs(role: str = Query("security"), actor: str = Query("Security")):
    allowed = can_access(role, "audit_logs")

    append_audit(
        actor=actor,
        role=role,
        action="VIEW_AUDIT_LOGS",
        resource="audit_logs",
        patient_id=None,
        allowed=allowed,
        reason="security center"
    )

    if not allowed:
        add_risk_event(
            title="감사 로그 권한 없는 접근",
            description=f"{actor}({role}) attempted audit logs",
            severity="high"
        )
        return {
            "error": "ACCESS_DENIED",
            "message": "감사 로그 접근 권한이 없습니다."
        }

    return load_json(SAMPLE_DATA_DIR / "audit_logs.json", [])


@app.get("/security/risk-events")
def risk_events(role: str = Query("security"), actor: str = Query("Security")):
    allowed = can_access(role, "risk_events")

    append_audit(
        actor=actor,
        role=role,
        action="VIEW_RISK_EVENTS",
        resource="risk_events",
        patient_id=None,
        allowed=allowed,
        reason="security center"
    )

    if not allowed:
        return {
            "error": "ACCESS_DENIED",
            "message": "위험 이벤트 접근 권한이 없습니다."
        }

    return load_json(SAMPLE_DATA_DIR / "risk_events.json", DEFAULT_RISK_EVENTS)


@app.get("/proteins")
def get_proteins():
    return load_json(SAMPLE_DATA_DIR / "proteins.json", [])


@app.get("/docking/{protein_id}")
def get_docking_result(protein_id: str):
    protein_id = protein_id.upper()
    data = load_json(SAMPLE_DATA_DIR / "docking_results.json", {})
    if isinstance(data, dict) and protein_id in data:
        return data[protein_id]
    return {
        "protein": protein_id,
        "note": "Sample docking result fallback",
        "ligands": [
            {"rank": 1, "name": "BDL-10234", "binding_score": -10.28},
            {"rank": 2, "name": "BDL-08765", "binding_score": -9.46},
            {"rank": 3, "name": "BDL-09123", "binding_score": -8.74}
        ]
    }


@app.get("/experiments")
def get_experiments():
    return load_json(EXPERIMENTS_FILE, [])


@app.post("/experiments/sample/{pdb_id}")
def create_sample_experiment(pdb_id: str):
    pdb_id = pdb_id.upper()
    experiment_id = f"EXP-{datetime.now().strftime('%Y-%m-%d-%H%M%S')}-{pdb_id}"
    result = {
        "experiment_id": experiment_id,
        "pdb_id": pdb_id,
        "status": "completed_sample_run",
        "engine": "AutoDock Vina sample mode",
        "best_score": round(random.uniform(-10.5, -8.0), 2),
        "created_at": datetime.now().isoformat()
    }

    output_file = OUTPUT_DIR / f"{experiment_id}_result.json"
    save_json(output_file, result)

    experiments = load_json(EXPERIMENTS_FILE, [])
    experiments.append(result)
    save_json(EXPERIMENTS_FILE, experiments)

    return result
