from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="BioDockLab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROTEINS = [
    {
        "id": "1",
        "name": "SARS-CoV-2 Main Protease",
        "pdb_id": "6LU7",
        "description": "A sample protein target used for educational docking visualization."
    }
]

DOCKING_RESULTS = {
    "1": {
        "protein": "SARS-CoV-2 Main Protease",
        "pdb_id": "6LU7",
        "ligands": [
            {"name": "Ligand-A", "binding_score": -8.7, "rank": 1},
            {"name": "Ligand-B", "binding_score": -7.9, "rank": 2},
            {"name": "Ligand-C", "binding_score": -6.4, "rank": 3}
        ],
        "note": "Scores are sample values for educational visualization only."
    }
}

@app.get("/")
def root():
    return {"message": "BioDockLab Backend Running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/proteins")
def get_proteins():
    return PROTEINS

@app.get("/docking/{protein_id}")
def get_docking_result(protein_id: str):
    return DOCKING_RESULTS.get(
        protein_id,
        {"error": "Protein not found"}
    )
