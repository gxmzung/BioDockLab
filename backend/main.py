from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
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
    pdb_id = pdb_id.upper()
    url = f"https://data.rcsb.org/rest/v1/core/entry/{pdb_id}"

    try:
        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            return {
                "error": "RCSB metadata not found",
                "pdb_id": pdb_id,
                "status_code": response.status_code
            }

        data = response.json()

        title = data.get("struct", {}).get("title", "Unknown title")

        experimental_methods = [
            item.get("method", "Unknown")
            for item in data.get("exptl", [])
        ]

        accession = data.get("rcsb_accession_info", {})
        deposit_date = accession.get("deposit_date", "Unknown")
        release_date = accession.get("initial_release_date", "Unknown")

        resolution_list = data.get("rcsb_entry_info", {}).get(
            "resolution_combined",
            []
        )

        resolution = resolution_list[0] if resolution_list else None

        citation = data.get("rcsb_primary_citation", {})
        citation_title = citation.get("title", "No primary citation title")
        journal = citation.get("journal_abbrev", "Unknown journal")
        year = citation.get("year", "Unknown year")

        return {
            "pdb_id": pdb_id,
            "title": title,
            "experimental_methods": experimental_methods,
            "resolution_angstrom": resolution,
            "deposit_date": deposit_date,
            "release_date": release_date,
            "citation_title": citation_title,
            "journal": journal,
            "year": year,
            "source": "RCSB PDB Data API"
        }

    except requests.RequestException as e:
        return {
            "error": "Failed to fetch RCSB metadata",
            "pdb_id": pdb_id,
            "detail": str(e)
        }


@app.get("/docking/config/{pdb_id}")
def get_docking_config(pdb_id: str):
    pdb_id = pdb_id.upper()
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
