import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [experiments, setExperiments] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [summary, setSummary] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [hospitalSummary, setHospitalSummary] = useState(null);
  const [patientReports, setPatientReports] = useState([]);
  const [status, setStatus] = useState("loading");

  async function loadRoleDetail(roleId) {
    const res = await fetch(`${API_BASE}/role-detail/${roleId}`);
    const data = await res.json();
    setSelectedRole(data);
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          experimentsRes,
          analysisRes,
          summaryRes,
          rolesRes,
          vitalsRes,
          hospitalSummaryRes,
          reportsRes,
        ] = await Promise.all([
          fetch(`${API_BASE}/experiments`),
          fetch(`${API_BASE}/analysis`),
          fetch(`${API_BASE}/platform-summary`),
          fetch(`${API_BASE}/roles`),
          fetch(`${API_BASE}/vital-signs`),
          fetch(`${API_BASE}/hospital-summary`),
          fetch(`${API_BASE}/patient-reports`),
        ]);

        const rolesData = await rolesRes.json();

        setExperiments(await experimentsRes.json());
        setAnalysis(await analysisRes.json());
        setSummary(await summaryRes.json());
        setRoles(rolesData);
        setVitals(await vitalsRes.json());
        setHospitalSummary(await hospitalSummaryRes.json());
        setPatientReports(await reportsRes.json());
        setStatus("connected");

        if (rolesData.length > 0) {
          await loadRoleDetail(rolesData[0].id);
        }
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
          <span className="badge">BioDockLab v2.3 · Hospital Data Layer</span>
          <h1>Patient Right-to-Know & Vital Sign Platform</h1>
          <p>
            BioDockLab은 환자의 알 권리, 간호사의 바이탈사인 확인,
            의료진의 판단 보조, 연구자의 실험 분석을 하나의 데이터 흐름으로 연결한다.
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
          <span>Patients</span>
          <strong>{hospitalSummary?.patients ?? "-"}</strong>
        </div>
        <div className="metric-card">
          <span>Watch Cases</span>
          <strong>{hospitalSummary?.watch ?? "-"}</strong>
        </div>
        <div className="metric-card">
          <span>Average SpO₂</span>
          <strong>{hospitalSummary?.average_spo2 ?? "-"}%</strong>
        </div>
      </section>

      <h2 className="section-title">Vital Sign Monitoring</h2>

      <section className="experiment-grid">
        {vitals.map((item) => (
          <article className="experiment-card" key={item.patient_id}>
            <h2>{item.patient_id}</h2>
            <p>{item.name} · Age {item.age}</p>
            <p>{item.note}</p>

            <div className="vital-grid">
              <span>HR <strong>{item.heart_rate}</strong></span>
              <span>BP <strong>{item.blood_pressure}</strong></span>
              <span>Temp <strong>{item.temperature}℃</strong></span>
              <span>SpO₂ <strong>{item.spo2}%</strong></span>
            </div>

            <div className="card-footer">
              <span className={`priority ${item.status === "Watch" ? "warning" : ""}`}>
                {item.status}
              </span>
              <span className="rate">{item.respiratory_rate}/min</span>
            </div>
          </article>
        ))}
      </section>

      <h2 className="section-title">Patient Right-to-Know Reports</h2>

      <section className="report-grid">
        {patientReports.map((report) => (
          <article className="report-card" key={report.patient_id}>
            <span className="badge">{report.patient_id}</span>
            <h2>{report.title}</h2>
            <p>{report.summary}</p>
            <p>{report.explanation}</p>
            <ul>
              {report.right_to_know.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <h2 className="section-title">Role-based Access Layer</h2>

      <section className="role-grid">
        {roles.map((role) => (
          <button
            className="role-card role-button"
            key={role.id}
            onClick={() => loadRoleDetail(role.id)}
          >
            <strong>{role.name}</strong>
            <p>{role.description}</p>
            <span>{role.focus}</span>
          </button>
        ))}
      </section>

      {selectedRole && (
        <section className="detail-panel">
          <div>
            <span className="badge">Selected Role</span>
            <h2>{selectedRole.title}</h2>
            <p>{selectedRole.summary}</p>
          </div>

          <div className="detail-columns">
            <div>
              <h3>Accessible Data</h3>
              <ul>
                {selectedRole.data_scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Restricted Data</h3>
              <ul>
                {selectedRole.restricted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <h2 className="section-title">Research Experiment Analysis</h2>

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

      <h2 className="section-title">Platform Pipeline</h2>

      <section className="pipeline">
        <div className="pipeline-step">Role Access</div>
        <div className="pipeline-step">Vital Signs</div>
        <div className="pipeline-step">Patient Report</div>
        <div className="pipeline-step">AI Analysis</div>
        <div className="pipeline-step">Simulation</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
