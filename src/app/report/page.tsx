import { Calendar, FileText, HeartPulse, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card, Pill, SectionTitle } from "@/components/Cards";
import ProteinVisual from "@/components/ProteinVisual";
import { treatmentCandidates } from "@/data/mock";

export default function ReportPage() {
  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Result Explanation Report</h1>
            <p className="mt-2 text-lg font-semibold text-slate-500">환자/의사용 이해 쉬운 결과 설명</p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm">
              <FileText className="mr-2 inline h-4 w-4" />
              PDF 저장
            </button>
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm">
              의사 메모
            </button>
            <button className="rounded-2xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-sm">
              <Calendar className="mr-2 inline h-4 w-4" />
              상담 준비
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_520px] gap-5">
          <div className="space-y-5">
            <Card>
              <SectionTitle title="환자 요약 정보" />
              <div className="grid grid-cols-4 divide-x divide-slate-100 rounded-2xl border border-slate-200 p-5">
                <InfoBlock label="Patient ID" value="PT-2025-0520-0017" />
                <InfoBlock label="진단 영역" value="비소세포폐암 (NSCLC)" icon={<HeartPulse className="h-7 w-7 text-teal-600" />} />
                <InfoBlock label="현재 상태" value="진행성, EGFR L858R 변이 양성" />
                <InfoBlock label="다음 상담 예정일" value="2025-06-02 (월) 10:00" icon={<Calendar className="h-7 w-7 text-blue-700" />} />
              </div>
            </Card>

            <Card>
              <SectionTitle title="치료제 후보 요약" />
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-black text-slate-500">
                  <tr>
                    <th className="px-4 py-3">후보 치료제</th>
                    <th>예상 효능</th>
                    <th>위험도</th>
                    <th>권장도</th>
                    <th>주요 근거</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentCandidates.map((row) => (
                    <tr key={row.name} className="border-t border-slate-100">
                      <td className="px-4 py-4">
                        <div className="font-black text-blue-700">{row.name}</div>
                        <div className="text-xs font-bold text-slate-500">{row.desc}</div>
                      </td>
                      <td>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-teal-500 border-r-slate-200 text-sm font-black">
                          {row.efficacy}%
                        </div>
                      </td>
                      <td>
                        <Pill tone={row.risk === "낮음" ? "green" : "orange"}>{row.risk}</Pill>
                      </td>
                      <td>
                        <Pill tone={row.recommend === "높음" ? "green" : row.recommend === "보통" ? "blue" : "purple"}>
                          {row.recommend}
                        </Pill>
                      </td>
                      <td className="max-w-md text-slate-600">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <SectionTitle title="쉽게 이해하는 설명" />
              <p className="text-[15px] font-medium leading-8 text-slate-700">
                검사 결과, 환자분의 암은 EGFR이라는 단백질의 특정 변이(L858R) 때문에 생긴 것으로
                확인되었습니다. 이 변이에 잘 맞는 치료제는 BD-201로 예측되며, 암을 줄일 가능성이
                높고 부작용 위험은 보통 수준으로 예상됩니다. 기존 치료제보다 더 효과적일 가능성이
                있어 추천됩니다.
              </p>
              <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm font-black text-blue-700">
                현재 환자 상태와 검사 결과를 종합했을 때, 긍정적인 치료 반응이 기대됩니다.
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="bg-teal-50/60">
              <SectionTitle title="의사 종합 해석" sub="한눈에 보기" />
              <div className="flex gap-4">
                <ShieldCheck className="h-12 w-12 shrink-0 text-teal-600" />
                <div>
                  <p className="text-lg font-black leading-8 text-teal-800">
                    환자에서 EGFR L858R 변이에 대한 치료 반응 가능성이 높은 치료제가 확인되었으며,
                    부작용 위험은 보통 수준으로 예측됩니다.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
                    <li>• 1차 권장 후보: BD-201</li>
                    <li>• 기존 치료제 대비 예측 반응률 향상 기대</li>
                    <li>• 예후가 양호할 가능성</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-5">
              <Card>
                <SectionTitle title="분자적 근거" sub="EGFR L858R 변이" />
                <ProteinVisual compact />
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                  BD-201은 EGFR L858R 변이 부위에 안정적으로 결합하여 신호 전달을 효과적으로
                  차단하는 것으로 예측됩니다.
                </p>
              </Card>

              <Card>
                <SectionTitle title="예측 반응 및 위험도" />
                <div className="flex h-44 items-center justify-center">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-teal-500 border-r-slate-200">
                    <div className="text-center">
                      <div className="text-3xl font-black">78</div>
                      <div className="text-xs font-bold text-slate-500">/100</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <Score label="유전자 적합성" value="92 / 100" />
                  <Score label="약물 결합 안정성" value="81 / 100" />
                  <Score label="세포 실험 예측" value="73 / 100" />
                  <Score label="부작용 예측" value="68 / 100" />
                </div>
              </Card>
            </div>

            <Card>
              <SectionTitle title="의사용 상세 해석" />
              <p className="text-[15px] font-medium leading-8 text-slate-700">
                EGFR L858R 변이 양성 NSCLC 환자에서 BD-201은 도킹 점수 -11.2 kcal/mol로
                2세대 TKI 대비 우수한 결합 친화도를 보였습니다. 분자 동역학 시뮬레이션에서
                RMSD 1.8 Å로 안정성이 확인되었고, 세포주 기반 예측 IC50은 12.3 nM으로 우수한
                활성을 보였습니다. CYP3A4 기반 약물상호작용 위험은 낮으며, QT prolongation
                위험도는 낮은 수준으로 예측됩니다.
              </p>
              <p className="mt-4 text-right text-sm font-black text-blue-700">상세 데이터 보기 〉</p>
            </Card>
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold text-slate-400">
          ※ 본 리포트는 AI 예측 모델 기반으로 생성되었으며, 임상적 판단은 담당 의사의 최종 결정이 필요합니다.
        </p>
      </div>
    </AppShell>
  );
}

function InfoBlock({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="px-5">
      <div className="mb-3 text-xs font-black text-slate-500">{label}</div>
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-sm font-black leading-6">{value}</div>
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
