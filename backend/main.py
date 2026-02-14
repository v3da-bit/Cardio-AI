from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="CardioAI API")

model = joblib.load("model.joblib")

class PatientData(BaseModel):
    features: list

@app.get("/health")
def health():
    return {"status": "API running"}

@app.post("/predict")
def predict(data: PatientData):
    input_array = np.array(data.features).reshape(1, -1)
    prediction = model.predict(input_array)[0]
    probability = model.predict_proba(input_array)[0][1]
    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }
