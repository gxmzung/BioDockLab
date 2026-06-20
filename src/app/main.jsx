import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [experiments, setExperiments] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [summary, setSummary] = useState(null);
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [experimentsRes, analysisRes, summaryRes, rolesRes] = await Promise.all([
          fetch(`${API_BASE}/experiments`),
          fetch(`${API_BASE}/analysis`),
          fetch(`${API_BASE}/platform-summary`),
          fetch(`${API_BASE}/roles`),
        ]);

        setExperiments(await experimentsRes.json());
        setAnalysis(await analysisRes.json());
        setSummary(await summaryRes.json());
        setRoles(await rolesRes.json());
        setStatus("connected");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadDashboard();
  }, []);

  const analysisMap = useMemo(() => {
    return new Map(analysis.map((item) => [item.id, item]));
  }, [analysis]);

  return (
    <main className="dashboard-shell">
      <section className="hero">
        <div>
          <span className="badge">BioDockLab v2.1 · API Connected</span>
          <h1>Role-based Bio AI Data Platform</h1>
          <p>
            BioDockLab은 환자의 알 권리, 의료진의 판단 보조, 연구자의 실험 분석을
            하나의 데이터 흐름으로 연결하는 의료·바이오 연구 플랫폼이다.
          </p>
        </div>

        <aside className="status-panel">
          <strong>Runtime Status</strong>
          <span>Frontend: Vite 5173</span>
          <span>Backend API: FastAPI 8000</span>
          <span>API Status: {status}</span>
        </aside>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <span>Roles</span>
          <strong>{summary?.roles ?? "-"}</strong>
        </div>
        <div className="metric-card">
          <span>Experiments</span>
          <strong>{summary?.experiments ?? "-"}</strong>
        </div>
        <div className="metric-card">
          <span>Average Success</span>
          <strong>{summary?.average_success_rate ?? "-"}%</strong>
        </div>
        <div className="metric-card">
          <span>High Priority</span>
          <strong>{summary?.high_priority ?? "-"}</strong>
        </div>
      </section>

      <h2 className="section-title">Experiment Analysis Overview</h2>

      <section className="experiment-grid">
        {experiments.map((exp) => {
          const result = analysisMap.get(exp.id);

          return (
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
                <span className="priority">{result?.priority ?? "Pending"}</span>
                <span className="rate">{exp.success_rate}%</span>
              </div>

              <p>{result?.recommendation}</p>
            </article>
          );
        })}
      </section>

      <h2 className="section-title">Role-based Access Layer</h2>

      <section className="role-grid">
        {roles.map((role) => (
          <article className="role-card" key={role.id}>
            <strong>{role.name}</strong>
            <p>{role.description}</p>
            <span>{role.focus}</span>
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
