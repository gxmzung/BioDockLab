from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from datetime import datetime
import json
import random
import requests

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
DOCKING_CONFIG_DIR = BASE_DIR / "docking" / "configs"
EXPERIMENTS_FILE = BASE_DIR / "experiments" / "experiment_runs.json"
OUTPUT_DIR = BASE_DIR / "docking" / "outputs"
LOG_DIR = BASE_DIR / "docking" / "logs"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)


def load_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


@app.get("/")
def root():
    return {
        "message": "BioDockLab Backend Running",
        "mode": "research-oriented docking visualization platform",
        "claim_boundary": "research and education support only"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/proteins")
def get_proteins():
    return load_json(SAMPLE_DATA_DIR / "proteins.json")


@app.get("/docking/{protein_id}")
def get_docking_result(protein_id: str):
    protein_id = protein_id.upper()
    docking_results = load_json(SAMPLE_DATA_DIR / "docking_results.json")
    if protein_id not in docking_results:
        return {"error": "Protein not found", "protein_id": protein_id}
    return docking_results[protein_id]


@app.get("/annotations/{pdb_id}")
def get_annotation(pdb_id: str):
    pdb_id = pdb_id.upper()
    annotations = load_json(SAMPLE_DATA_DIR / "protein_annotations.json")
    if pdb_id not in annotations:
        return {"error": "Annotation not found", "pdb_id": pdb_id}
    return annotations[pdb_id]


@app.get("/metadata/{pdb_id}")
def get_metadata(pdb_id: str):
    pdb_id = pdb_id.upper()
    url = f"https://data.rcsb.org/rest/v1/core/entry/{pdb_id}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return {"error": "RCSB metadata not found", "pdb_id": pdb_id, "status_code": response.status_code}
        data = response.json()
        title = data.get("struct", {}).get("title", "Unknown title")
        methods = [item.get("method", "Unknown") for item in data.get("exptl", [])]
        accession = data.get("rcsb_accession_info", {})
        resolution_list = data.get("rcsb_entry_info", {}).get("resolution_combined", [])
        citation = data.get("rcsb_primary_citation", {})
        return {
            "pdb_id": pdb_id,
            "title": title,
            "experimental_methods": methods,
            "resolution_angstrom": resolution_list[0] if resolution_list else None,
            "deposit_date": accession.get("deposit_date", "Unknown"),
            "release_date": accession.get("initial_release_date", "Unknown"),
            "citation_title": citation.get("title", "No primary citation title"),
            "journal": citation.get("journal_abbrev", "Unknown journal"),
            "year": citation.get("year", "Unknown year"),
            "source": "RCSB PDB Data API"
        }
    except requests.RequestException as e:
        return {"error": "Failed to fetch RCSB metadata", "pdb_id": pdb_id, "detail": str(e)}


@app.get("/docking/config/{pdb_id}")
def get_docking_config(pdb_id: str):
    pdb_id = pdb_id.upper()
    config_path = DOCKING_CONFIG_DIR / f"{pdb_id}_config.json"
    if not config_path.exists():
        return {"error": "Docking config not found", "pdb_id": pdb_id}
    return load_json(config_path)


@app.get("/experiments")
def get_experiments():
    if not EXPERIMENTS_FILE.exists():
        save_json(EXPERIMENTS_FILE, [])
    return load_json(EXPERIMENTS_FILE)


@app.get("/experiments/{experiment_id}")
def get_experiment(experiment_id: str):
    experiments = get_experiments()
    experiment = next((item for item in experiments if item["id"] == experiment_id), None)
    if not experiment:
        return {"error": "Experiment not found", "experiment_id": experiment_id}
    return experiment


@app.get("/reports/summary/{pdb_id}")
def get_summary_report(pdb_id: str):
    pdb_id = pdb_id.upper()
    metadata = get_metadata(pdb_id)
    config = get_docking_config(pdb_id)
    annotation = get_annotation(pdb_id)
    docking = get_docking_result(pdb_id)
    return {
        "pdb_id": pdb_id,
        "metadata": metadata,
        "annotation": annotation,
        "docking_config": config,
        "sample_docking": docking,
        "claim_boundary": "This report is for research/education support only. It is not a clinical or pharmaceutical validation."
    }


@app.post("/experiments/sample/{pdb_id}")
def create_sample_experiment(pdb_id: str):
    pdb_id = pdb_id.upper()
    docking_results = load_json(SAMPLE_DATA_DIR / "docking_results.json")
    if pdb_id not in docking_results:
        return {"error": "Protein docking sample not found", "pdb_id": pdb_id}

    timestamp = datetime.now().strftime("%Y-%m-%d-%H%M%S")
    experiment_id = f"EXP-{timestamp}-{pdb_id}"
    ligands = docking_results[pdb_id]["ligands"]

    jittered_ligands = []
    for ligand in ligands:
        jitter = round(random.uniform(-0.2, 0.2), 2)
        jittered_ligands.append({
            "name": ligand["name"],
            "binding_score": round(ligand["binding_score"] + jitter, 2),
            "rank": ligand["rank"]
        })
    best_score = min(item["binding_score"] for item in jittered_ligands)

    output_file = OUTPUT_DIR / f"{experiment_id}_result.json"
    log_file = LOG_DIR / f"{experiment_id}.log"
    result_payload = {
        "experiment_id": experiment_id,
        "pdb_id": pdb_id,
        "engine": "AutoDock Vina",
        "execution_mode": "sample",
        "status": "completed_sample_run",
        "ligands": jittered_ligands,
        "best_score": best_score,
        "output_file": str(output_file.relative_to(BASE_DIR)),
        "log_file": str(log_file.relative_to(BASE_DIR)),
        "created_at": datetime.now().isoformat(),
        "reproducibility_note": "Sample-mode run. Real Vina execution is planned for a later phase."
    }
    save_json(output_file, result_payload)
    with open(log_file, "w", encoding="utf-8") as f:
        f.write("[BioDockLab Sample Run]\n")
        for key, value in result_payload.items():
            if key != "ligands":
                f.write(f"{key}={value}\n")

    experiments = get_experiments()
    experiments.append({
        "id": experiment_id,
        "pdb_id": pdb_id,
        "target": docking_results[pdb_id]["protein"],
        "status": "completed_sample_run",
        "engine": "AutoDock Vina",
        "vina_version": "planned",
        "input_format": "PDBQT",
        "created_at": datetime.now().isoformat(),
        "best_score": best_score,
        "output_file": str(output_file.relative_to(BASE_DIR)),
        "log_file": str(log_file.relative_to(BASE_DIR)),
        "reproducibility_note": "Sample-mode experiment generated by BioDockLab."
    })
    save_json(EXPERIMENTS_FILE, experiments)
    return result_payload
