import { Download, FileText, Play, Save } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card, Pill, SectionTitle } from "@/components/Cards";
import ProteinVisual from "@/components/ProteinVisual";
import { dockingResults } from "@/data/mock";

export default function DockingPage() {
  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">Research Lab 〉 Docking Experiments 〉 EXP-2025-05-20-001</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Virtual Docking Experiment</h1>
            <p className="mt-2 text-lg font-semibold text-slate-500">단백질-화합물 결합 예측 및 스크리닝</p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm">
              <Save className="mr-2 inline h-4 w-4" />
              결과 저장
            </button>
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm">
              <FileText className="mr-2 inline h-4 w-4" />
              보고서 생성
            </button>
            <button className="rounded-2xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-sm">
              <Play className="mr-2 inline h-4 w-4" />
              실험 실행
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[300px_1fr_360px] gap-5">
          <div className="space-y-5">
            <Card>
              <div className="flex justify-between">
                <SectionTitle title="타겟 단백질" />
                <Pill tone="green">준비됨</Pill>
              </div>
              <h3 className="text-xl font-black">KRAS G12D</h3>
              <p className="mt-1 text-sm font-bold text-slate-500">PDB ID: 6R68</p>
              <div className="mt-5 space-y-3 text-sm">
                <Info label="유전자" value="KRAS" />
                <Info label="돌연변이" value="G12D" />
                <Info label="길이" value="189 aa" />
                <Info label="해상도" value="2.20 Å" />
                <Info label="바인딩 부위" value="SII Pocket" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between">
                <SectionTitle title="선택 화합물" />
                <Pill tone="gray">편집</Pill>
              </div>
              <h3 className="text-xl font-black text-blue-700">BDL-10234</h3>
              <p className="text-sm font-bold text-slate-500">내부 라이브러리</p>

              <div className="mt-5 flex h-40 items-center justify-center rounded-3xl bg-slate-50">
                <svg viewBox="0 0 220 140" className="h-32 w-48">
                  <path d="M55 70 L85 45 L120 60 L150 42 L180 68 L162 100 L118 98 L88 112 Z" fill="none" stroke="#0f172a" strokeWidth="4" />
                  <circle cx="85" cy="45" r="7" fill="#2563eb" />
                  <circle cx="150" cy="42" r="7" fill="#ef4444" />
                  <circle cx="180" cy="68" r="7" fill="#22c55e" />
                  <circle cx="118" cy="98" r="7" fill="#eab308" />
                </svg>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                <Info label="MW" value="452.91" />
                <Info label="ID" value="BDL-10234" />
                <Info label="공급원" value="BioDockLib" />
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-4">
              <div className="mb-4 flex justify-between">
                <div className="flex gap-2">
                  <button className="rounded-xl bg-blue-700 px-5 py-2 text-sm font-black text-white">3D View</button>
                  <button className="rounded-xl bg-slate-100 px-5 py-2 text-sm font-black text-slate-600">2D Interaction</button>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-slate-200 bg-white p-2">
                    <Download className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
              <ProteinVisual />
              <div className="mt-4 flex flex-wrap gap-5 text-xs font-bold text-slate-500">
                <span className="text-teal-600">● Hydrogen Bond</span>
                <span className="text-purple-600">● Hydrophobic</span>
                <span className="text-orange-500">● π-π Stacking</span>
                <span className="text-blue-600">● Salt Bridge</span>
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex gap-4 border-b border-slate-100 text-sm font-black">
                {["결과", "상세 상호작용", "에너지 분석", "ADMET 예측", "다중 포즈 비교"].map((tab, i) => (
                  <span key={tab} className={i === 0 ? "border-b-2 border-blue-700 px-3 pb-3 text-blue-700" : "px-3 pb-3 text-slate-500"}>
                    {tab}
                  </span>
                ))}
              </div>

              <table className="w-full text-sm">
                <thead className="text-left text-xs font-black text-slate-500">
                  <tr>
                    <th className="py-3">순위</th>
                    <th>화합물 ID</th>
                    <th>Binding Score</th>
                    <th>ΔG</th>
                    <th>RMSD</th>
                    <th>H-bond</th>
                    <th>ADMET Risk</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody>
                  {dockingResults.map((row) => (
                    <tr key={row.compoundId} className="border-t border-slate-100">
                      <td className="py-3 font-black">{row.rank}</td>
                      <td className="font-bold text-blue-700">{row.compoundId}</td>
                      <td>{row.bindingScore}</td>
                      <td>{row.mmgbsa}</td>
                      <td>{row.rmsd}</td>
                      <td>{row.hBond}</td>
                      <td>
                        <Pill tone={row.risk === "Low" ? "green" : row.risk === "Medium" ? "orange" : "red"}>
                          {row.risk}
                        </Pill>
                      </td>
                      <td>
                        <input type="radio" defaultChecked={row.rank === 1} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <div className="flex justify-between">
                <SectionTitle title="실험 파라미터" />
                <Pill tone="gray">편집</Pill>
              </div>
              <div className="space-y-3 text-sm">
                <Info label="도킹 프로그램" value="AutoDock Vina 1.2.3" />
                <Info label="그리드 박스" value="24.0 × 24.0 × 24.0 Å" />
                <Info label="그리드 중심" value="X:25.62, Y:13.47, Z:8.91" />
                <Info label="탐색 알고리즘" value="GA" />
                <Info label="포즈 개수" value="20" />
                <Info label="에너지 정렬" value="MM/GBSA" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between">
                <SectionTitle title="실험 상태" />
                <Pill tone="blue">실행 중</Pill>
              </div>

              <div className="mb-5 space-y-3 text-sm">
                <Info label="실험 ID" value="EXP-2025-05-20-001" />
                <Info label="생성자" value="김서연 박사" />
                <Info label="진행 상황" value="Scoring 단계 (3/4)" />
              </div>

              <div className="flex justify-between text-xs font-black text-slate-500">
                <span>스크리닝</span>
                <span>도킹</span>
                <span className="text-blue-700">스코어링</span>
                <span>리뷰</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[72%] rounded-full bg-blue-700" />
              </div>
              <div className="mt-2 text-right text-sm font-black text-blue-700">72%</div>
            </Card>

            <Card>
              <SectionTitle title="빠른 액션" />
              <div className="grid grid-cols-2 gap-3">
                {["결과 저장", "보고서 생성", "포즈 내보내기", "새 실험 시작"].map((item) => (
                  <button key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm font-black text-blue-700">
                    {item}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="font-black text-slate-800">{value}</span>
    </div>
  );
}
