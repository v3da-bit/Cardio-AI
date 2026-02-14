import React, { useState } from "react";

function App() {
  const [features, setFeatures] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ features: features.split(",").map(Number) })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>CardioAI</h1>
      <input
        type="text"
        placeholder="Enter comma separated features"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        style={{ width: "400px" }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Predict
      </button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Prediction: {result.prediction}</p>
          <p>Probability: {result.probability}</p>
        </div>
      )}
    </div>
  );
}

export default App;
