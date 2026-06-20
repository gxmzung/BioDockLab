from pathlib import Path
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT_DIR / "sample_data"
CORE_DATA_DIR = ROOT_DIR / "data" / "sample"

app = FastAPI(
    title="BioDockLab API",
    version="2.1.0",
    description="Role-based medical and bio research data platform API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_json(path: Path, fallback):
    if not path.exists():
        return fallback

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


@app.get("/")
def root():
    return {
        "project": "BioDockLab",
        "version": "2.1",
        "message": "Bio AI research software platform API",
        "modules": [
            "roles",
            "experiments",
            "analysis",
            "access-policies",
            "risk-events",
            "audit-logs",
        ],
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "biodocklab-api",
        "version": "2.1.0",
    }


@app.get("/roles")
def get_roles():
    return [
        {
            "id": "patient",
            "name": "Patient",
            "description": "검사 결과와 설명 리포트를 확인하는 사용자",
            "focus": "알 권리, 결과 이해, 상담 준비",
        },
        {
            "id": "nurse",
            "name": "Nurse",
            "description": "바이탈사인과 인수인계 정보를 확인하는 사용자",
            "focus": "바이탈사인, 투약 전 확인, 상태 변화",
        },
        {
            "id": "doctor",
            "name": "Doctor",
            "description": "검사 결과와 위험도 평가를 기반으로 판단을 보조받는 사용자",
            "focus": "진단 보조, 치료 방향, 위험도 해석",
        },
        {
            "id": "pharmacist",
            "name": "Pharmacist",
            "description": "처방, 약물상호작용, 유전자 적합성을 검토하는 사용자",
            "focus": "처방 검토, 상호작용, 안전성",
        },
        {
            "id": "admin",
            "name": "Admin",
            "description": "예약, 동의서, 서류 상태를 관리하는 사용자",
            "focus": "동의서, 문서 상태, 접수 흐름",
        },
        {
            "id": "researcher",
            "name": "Researcher",
            "description": "실험 데이터와 시뮬레이션 결과를 분석하는 사용자",
            "focus": "실험 데이터, 연구 분석, 시뮬레이션",
        },
        {
            "id": "security",
            "name": "Security Officer",
            "description": "접근 로그와 민감정보 사용을 감사하는 사용자",
            "focus": "접근 제어, 감사 로그, 보안 정책",
        },
    ]


@app.get("/experiments")
def get_experiments():
    fallback = [
        {
            "id": "EXP-ORG-001",
            "domain": "Organoid",
            "sample": "Patient-derived mini organoid sample",
            "condition": "Drug response screening / 72h culture",
            "success_rate": 86,
            "risk_level": "Low",
        },
        {
            "id": "EXP-DT-002",
            "domain": "Digital Twin",
            "sample": "Virtual patient response model",
            "condition": "Treatment strength simulation",
            "success_rate": 78,
            "risk_level": "Medium",
        },
        {
            "id": "EXP-CFPS-003",
            "domain": "CFPS",
            "sample": "Cell-free protein synthesis batch",
            "condition": "Temperature / enzyme quality / substrate level",
            "success_rate": 69,
            "risk_level": "High",
        },
    ]

    data = load_json(CORE_DATA_DIR / "bio_experiments.json", fallback)

    if isinstance(data, dict):
        return data.get("experiments", fallback)

    return data


@app.get("/analysis")
def get_analysis():
    experiments = get_experiments()
    results = []

    for exp in experiments:
        success_rate = exp.get("success_rate", 0)
        risk_level = exp.get("risk_level", "Medium")

        if success_rate >= 80 and risk_level == "Low":
            priority = "High Priority"
            recommendation = "Proceed to validation report"
        elif success_rate >= 70:
            priority = "Review"
            recommendation = "Compare with baseline and request secondary review"
        else:
            priority = "Needs Improvement"
            recommendation = "Adjust experiment condition and rerun analysis"

        results.append(
            {
                "id": exp.get("id"),
                "priority": priority,
                "risk_level": risk_level,
                "recommendation": recommendation,
            }
        )

    return results


@app.get("/access-policies")
def get_access_policies():
    return load_json(DATA_DIR / "access_policies.json", [])


@app.get("/risk-events")
def get_risk_events():
    return load_json(DATA_DIR / "risk_events.json", [])


@app.get("/audit-logs")
def get_audit_logs():
    return load_json(DATA_DIR / "audit_logs.json", [])


@app.get("/platform-summary")
def get_platform_summary():
    experiments = get_experiments()
    analysis = get_analysis()
    roles = get_roles()

    high_priority = sum(1 for item in analysis if item["priority"] == "High Priority")
    avg_success = round(
        sum(exp.get("success_rate", 0) for exp in experiments) / max(len(experiments), 1),
        1,
    )

    return {
        "roles": len(roles),
        "experiments": len(experiments),
        "high_priority": high_priority,
        "average_success_rate": avg_success,
        "research_directions": [
            "Organoid",
            "Surgery AI",
            "Quantum Biocomputing",
            "Digital Twin",
            "CFPS",
        ],
    }
