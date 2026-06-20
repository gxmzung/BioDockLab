import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const experiments = [
  {
    id: "EXP-ORG-001",
    domain: "Organoid",
    sample: "Patient-derived mini organoid sample",
    condition: "Drug response screening / 72h culture",
    success_rate: 86,
    priority: "High Priority"
  },
  {
    id: "EXP-DT-002",
    domain: "Digital Twin",
    sample: "Virtual patient response model",
    condition: "Treatment strength simulation",
    success_rate: 78,
    priority: "Review"
  },
  {
    id: "EXP-CFPS-003",
    domain: "CFPS",
    sample: "Cell-free protein synthesis batch",
    condition: "Temperature / enzyme quality / substrate level",
    success_rate: 69,
    priority: "Needs Improvement"
  }
];

function App() {
  return (
    <main className="dashboard-shell">
      <section className="hero">
        <div>
          <span className="badge">BioDockLab v2.1 · Research Platform</span>
          <h1>Role-based Bio AI Data Platform</h1>
          <p>
            BioDockLab은 의료·바이오 실험 데이터를 역할 기반으로 관리하고,
            AI 분석, 위험도 평가, 디지털 트윈 시뮬레이션, 리포트 생성을 연결하는
            확장형 연구 소프트웨어 플랫폼이다.
          </p>
        </div>

        <aside className="status-panel">
          <strong>Runtime Status</strong>
          <span>Frontend: Vite 5173</span>
          <span>Backend API: FastAPI 8000</span>
          <span>Mode: Local MVP</span>
        </aside>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <span>Research Directions</span>
          <strong>5</strong>
        </div>
        <div className="metric-card">
          <span>Role-based Screens</span>
          <strong>7+</strong>
        </div>
        <div className="metric-card">
          <span>API Core</span>
          <strong>FastAPI</strong>
        </div>
        <div className="metric-card">
          <span>Data Flow</span>
          <strong>AI + Report</strong>
        </div>
      </section>

      <h2 className="section-title">Experiment Analysis Overview</h2>

      <section className="experiment-grid">
        {experiments.map((exp) => (
          <article className="experiment-card" key={exp.id}>
            <h2>{exp.domain}</h2>
            <p>{exp.sample}</p>
            <p>{exp.condition}</p>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${exp.success_rate}%` }}
              />
            </div>

            <div className="card-footer">
              <span className="priority">{exp.priority}</span>
              <span className="rate">{exp.success_rate}%</span>
            </div>
          </article>
        ))}
      </section>

      <h2 className="section-title">Platform Pipeline</h2>

      <section className="pipeline">
        <div className="pipeline-step">Role Access</div>
        <div className="pipeline-step">Experiment Data</div>
        <div className="pipeline-step">AI Analysis</div>
        <div className="pipeline-step">Simulation</div>
        <div className="pipeline-step">Report</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
