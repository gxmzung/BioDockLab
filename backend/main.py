from fastapi import FastAPI

app = FastAPI(title="BioDockLab API")

@app.get("/")
def root():
    return {"message": "BioDockLab Backend Running"}

@app.get("/health")
def health():
    return {"status": "ok"}
