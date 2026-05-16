from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from datetime import datetime
import json, random, requests

app = FastAPI(title="BioDockLab API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
BASE = Path(__file__).resolve().parent.parent
DATA = BASE / "sample_data"
EXPERIMENTS = BASE / "experiments" / "experiment_runs.json"
OUT = BASE / "docking" / "outputs"
LOG = BASE / "docking" / "logs"
OUT.mkdir(parents=True, exist_ok=True); LOG.mkdir(parents=True, exist_ok=True); EXPERIMENTS.parent.mkdir(parents=True, exist_ok=True)
POLICY = {
  "patient":{"patient","reports_limited","consent_status"},
  "doctor":{"dashboard","patient","doctor","reports","prescription"},
  "pharmacist":{"dashboard","patient_limited","prescription","reports_limited"},
  "admin_staff":{"dashboard","admin","appointments","consent_status","patient_limited"},
  "researcher":{"dashboard","research_lab","docking","reports","data_hub"},
  "security":{"dashboard","security","audit_logs","risk_events"}
}

def j(path, default=None):
    p = Path(path)
    if not p.exists(): return [] if default is None else default
    return json.loads(p.read_text(encoding="utf-8"))

def w(path, obj):
    Path(path).write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")

def seed():
    return j(DATA / "clinical_seed.json", {})

def access(role, view): return view in POLICY.get(role, set())

def audit(actor, role, action, resource, patient_id=None, allowed=True, reason=""):
    s = seed(); logs = s.get("audit_logs", [])
    item = {"timestamp":datetime.now().isoformat(timespec="seconds"),"actor":actor,"role":role,"action":action,"resource":resource,"patient_id":patient_id,"allowed":allowed,"reason":reason}
    logs.append(item); s["audit_logs"] = logs; w(DATA / "clinical_seed.json", s); return item

def risk(title, desc, severity="high"):
    s = seed(); ev = s.get("risk_events", [])
    ev.append({"id":f"RISK-{len(ev)+1:03d}","severity":severity,"title":title,"description":desc,"status":"needs_review"})
    s["risk_events"] = ev; w(DATA / "clinical_seed.json", s)

@app.get("/")
def root(): return {"message":"BioDockLab Backend Running","mode":"clinical security layer + research workflow prototype"}
@app.get("/health")
def health(): return {"status":"ok"}

@app.get("/proteins")
def proteins(): return j(DATA / "proteins.json", [])
@app.get("/docking/{protein_id}")
def docking(protein_id: str):
    d = j(DATA / "docking_results.json", {})
    return d.get(protein_id.upper(), {"error":"Protein not found"})
@app.get("/annotations/{pdb_id}")
def annotations(pdb_id: str):
    d = j(DATA / "protein_annotations.json", {})
    return d.get(pdb_id.upper(), {"error":"Annotation not found"})
@app.get("/metadata/{pdb_id}")
def metadata(pdb_id: str):
    pdb_id = pdb_id.upper(); url=f"https://data.rcsb.org/rest/v1/core/entry/{pdb_id}"
    try:
        r=requests.get(url, timeout=10)
        if r.status_code != 200: return {"error":"RCSB metadata not found","pdb_id":pdb_id}
        d=r.json(); citation=d.get("rcsb_primary_citation",{}); acc=d.get("rcsb_accession_info",{}); res=d.get("rcsb_entry_info",{}).get("resolution_combined",[])
        return {"pdb_id":pdb_id,"title":d.get("struct",{}).get("title","Unknown"),"experimental_methods":[x.get("method","Unknown") for x in d.get("exptl",[])],"resolution_angstrom":res[0] if res else None,"deposit_date":acc.get("deposit_date","Unknown"),"release_date":acc.get("initial_release_date","Unknown"),"citation_title":citation.get("title","No primary citation title"),"journal":citation.get("journal_abbrev","Unknown"),"year":citation.get("year","Unknown"),"source":"RCSB PDB Data API"}
    except Exception as e: return {"error":"Failed to fetch RCSB metadata","detail":str(e)}
@app.get("/docking/config/{pdb_id}")
def cfg(pdb_id: str): return j(BASE / "docking" / "configs" / f"{pdb_id.upper()}_config.json", {"error":"Docking config not found"})
@app.get("/experiments")
def experiments(): return j(EXPERIMENTS, [])
@app.post("/experiments/sample/{pdb_id}")
def sample_exp(pdb_id: str):
    pdb_id=pdb_id.upper(); d=j(DATA / "docking_results.json", {})
    if pdb_id not in d: return {"error":"Protein docking sample not found"}
    eid=f"EXP-{datetime.now().strftime('%Y-%m-%d-%H%M%S')}-{pdb_id}"; lig=[]
    for x in d[pdb_id]["ligands"]: lig.append({"name":x["name"],"binding_score":round(x["binding_score"]+random.uniform(-.2,.2),2),"rank":x["rank"]})
    best=min(x["binding_score"] for x in lig); payload={"experiment_id":eid,"pdb_id":pdb_id,"engine":"AutoDock Vina","execution_mode":"sample","status":"completed_sample_run","ligands":lig,"best_score":best,"created_at":datetime.now().isoformat()}
    w(OUT / f"{eid}_result.json", payload); (LOG / f"{eid}.log").write_text(str(payload), encoding="utf-8")
    ex=j(EXPERIMENTS, []); ex.append({"id":eid,"pdb_id":pdb_id,"status":"completed_sample_run","best_score":best,"created_at":payload["created_at"]}); w(EXPERIMENTS, ex); return payload

@app.get("/clinical/users")
def users(): return seed()["users"]
@app.post("/security/access-check")
def access_check(payload: dict):
    role=payload.get("role",""); actor=payload.get("actor","unknown"); view=payload.get("view",""); pid=payload.get("patient_id")
    ok=access(role, view); audit(actor, role, "ACCESS_CHECK", view, pid, ok, payload.get("reason","screen access"))
    if not ok:
        risk("권한 없는 화면 접근 시도", f"{actor}({role}) tried to access {view} for patient {pid}", "high")
        return {"allowed":False,"message":"권한이 없는 화면입니다. 보안 로그에 기록되었습니다."}
    return {"allowed":True,"message":"접근 허용"}
@app.get("/clinical/patient/{patient_id}/summary")
def patient_summary(patient_id: str, role: str=Query("patient"), actor: str=Query("unknown")):
    view="patient" if role in ["patient","doctor"] else "patient_limited"; ok=access(role,view); audit(actor,role,"VIEW_PATIENT_SUMMARY",view,patient_id,ok,"patient summary")
    if not ok: risk("환자 요약 권한 없는 접근", f"{actor}({role}) attempted patient summary {patient_id}"); return {"error":"ACCESS_DENIED","message":"환자 요약 접근 권한이 없습니다."}
    p=seed()["patient"]
    if role=="admin_staff": return {"patient_id":p["patient_id"],"name_masked":p["name_masked"],"next_appointment":p["next"],"consent":p["consent"],"masked_notice":"원무 화면에서는 진단/처방 상세 데이터가 제한됩니다."}
    if role=="patient": return {"patient_id":p["patient_id"],"name_masked":p["name_masked"],"diagnosis":p["diagnosis"],"current_status":p["status"],"next_appointment":p["next"],"summary":p["summary_for_patient"],"consent":p["consent"]}
    return p
@app.get("/clinical/patient/{patient_id}/report")
def report(patient_id: str, role: str=Query("doctor"), actor: str=Query("unknown")):
    view="reports" if role in ["doctor","researcher"] else "reports_limited"; ok=access(role,view); audit(actor,role,"VIEW_REPORT",view,patient_id,ok,"clinical explanation report")
    if not ok: risk("리포트 권한 없는 접근", f"{actor}({role}) attempted report {patient_id}"); return {"error":"ACCESS_DENIED","message":"리포트 접근 권한이 없습니다."}
    r=seed()["report"]
    if role in ["patient","pharmacist"]: return {"overall_score":r["overall_score"],"response_possibility":"높음","patient_summary":r["patient_summary"],"claim_boundary":"설명 보조 자료이며 최종 판단은 의료진이 수행합니다."}
    return r
@app.get("/clinical/patient/{patient_id}/prescriptions")
def prescriptions(patient_id: str, role: str=Query("doctor"), actor: str=Query("unknown")):
    ok=access(role,"prescription"); audit(actor,role,"VIEW_PRESCRIPTION","prescription",patient_id,ok,"prescription review")
    if not ok: risk("처방 상세 권한 없는 접근", f"{actor}({role}) attempted prescriptions {patient_id}"); return {"error":"ACCESS_DENIED","message":"처방 상세 접근 권한이 없습니다."}
    return seed()["prescriptions"] if role in ["doctor","pharmacist"] else [{"drug":x["drug"],"masked_notice":"상세 처방량은 의료진 상담 화면에서 확인됩니다."} for x in seed()["prescriptions"]]
@app.get("/clinical/admin/appointments")
def appointments(role: str=Query("admin_staff"), actor: str=Query("unknown")):
    ok=access(role,"appointments"); audit(actor,role,"VIEW_APPOINTMENTS","appointments",None,ok,"admin appointment screen")
    if not ok: risk("원무 화면 권한 없는 접근", f"{actor}({role}) attempted appointment screen", "medium"); return {"error":"ACCESS_DENIED","message":"원무 화면 접근 권한이 없습니다."}
    p=seed()["patient"]; return [{"patient_id":p["patient_id"],"name_masked":p["name_masked"],"next_appointment":p["next"],"consent_research_use":p["consent"]["research_use"],"note":"진단/처방 상세는 마스킹됨"}]
@app.get("/security/audit-logs")
def audit_logs(role: str=Query("security"), actor: str=Query("unknown")):
    ok=access(role,"audit_logs"); audit(actor,role,"VIEW_AUDIT_LOGS","audit_logs",None,ok,"security center")
    if not ok: risk("감사 로그 권한 없는 접근", f"{actor}({role}) attempted audit logs"); return {"error":"ACCESS_DENIED","message":"감사 로그 접근 권한이 없습니다."}
    return seed()["audit_logs"]
@app.get("/security/risk-events")
def risk_events(role: str=Query("security"), actor: str=Query("unknown")):
    ok=access(role,"risk_events"); audit(actor,role,"VIEW_RISK_EVENTS","risk_events",None,ok,"security center")
    if not ok: risk("위험 이벤트 권한 없는 접근", f"{actor}({role}) attempted risk events"); return {"error":"ACCESS_DENIED","message":"위험 이벤트 접근 권한이 없습니다."}
    return seed()["risk_events"]
