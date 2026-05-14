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


def load_json(filename: str):
    file_path = SAMPLE_DATA_DIR / filename

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
def root():
    return {
        "message": "BioDockLab Backend Running",
        "description": "Educational protein-ligand docking visualization API"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/proteins")
def get_proteins():
    return load_json("proteins.json")


@app.get("/docking/{protein_id}")
def get_docking_result(protein_id: str):
    docking_results = load_json("docking_results.json")

    if protein_id not in docking_results:
        return {
            "error": "Protein not found",
            "protein_id": protein_id
        }

    return docking_results[protein_id]
