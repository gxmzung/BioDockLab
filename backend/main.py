from fastapi import FastAPI
from pathlib import Path
import json

app = FastAPI(title="BioDockLab API", version="2.1.0")

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "sample" / "bio_experiments.json"


def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
def root():
    return {
        "project": "BioDockLab",
        "version": "2.1",
        "message": "Bio AI research software platform API"
    }


@app.get("/experiments")
def get_experiments():
    return load_data()


@app.get("/experiments/{experiment_id}")
def get_experiment(experiment_id: str):
    experiments = load_data()
    for exp in experiments:
        if exp["id"] == experiment_id:
            return exp
    return {"error": "Experiment not found"}