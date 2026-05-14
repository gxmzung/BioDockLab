from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

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


def load_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
def root():
    return {
        "message": "BioDockLab Backend Running",
        "mode": "research-oriented docking visualization platform"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/proteins")
def get_proteins():
    return load_json(SAMPLE_DATA_DIR / "proteins.json")


@app.get("/docking/{protein_id}")
def get_docking_result(protein_id: str):
    docking_results = load_json(SAMPLE_DATA_DIR / "docking_results.json")

    if protein_id not in docking_results:
        return {
            "error": "Protein not found",
            "protein_id": protein_id
        }

    return docking_results[protein_id]


@app.get("/metadata/{pdb_id}")
def get_metadata(pdb_id: str):
    proteins = load_json(SAMPLE_DATA_DIR / "proteins.json")

    protein = next(
        (item for item in proteins if item["id"].lower() == pdb_id.lower()),
        None
    )

    if not protein:
        return {
            "error": "Metadata not found",
            "pdb_id": pdb_id
        }

    return {
        "pdb_id": protein["id"],
        "name": protein["name"],
        "category": protein["category"],
        "description": protein["description"],
        "source": "local_sample_metadata",
        "note": "RCSB metadata integration planned in next phase."
    }


@app.get("/docking/config/{pdb_id}")
def get_docking_config(pdb_id: str):
    config_path = DOCKING_CONFIG_DIR / f"{pdb_id}_config.json"

    if not config_path.exists():
        return {
            "error": "Docking config not found",
            "pdb_id": pdb_id
        }

    return load_json(config_path)


@app.get("/experiments")
def get_experiments():
    return load_json(EXPERIMENTS_FILE)


@app.get("/experiments/{experiment_id}")
def get_experiment(experiment_id: str):
    experiments = load_json(EXPERIMENTS_FILE)

    experiment = next(
        (item for item in experiments if item["id"] == experiment_id),
        None
    )

    if not experiment:
        return {
            "error": "Experiment not found",
            "experiment_id": experiment_id
        }

    return experiment
