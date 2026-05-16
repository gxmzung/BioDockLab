import {
  ArrowRight,
  Beaker,
  ClipboardList,
  FileText,
  Microscope,
  Stethoscope,
  Users,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card, Pill, SectionTitle } from "@/components/Cards";
import ProteinVisual from "@/components/ProteinVisual";
import { recentExperiments, stats } from "@/data/mock";

const iconMap = [Beaker, Microscope, Users, FileText];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-[1fr_520px] gap-6 p-8">
        <div>
          <div className="mb-8 rounded-[2rem] bg-white p-8">
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              Integrated Bio Platform
            </h1>
            <p className="mt-4 text-lg font-semibold text-slate-600">
              <span className="text-blue-700">환자</span> ·{" "}
              <span className="text-teal-600">의사</span> ·{" "}
              <span className="text-purple-600">연구자</span>를 연결하여 더 나은 치료와 혁신을 만듭니다.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-4">
            {stats.map((item, index) => {
              const Icon = iconMap[index];
              return (
                <Card key={item.label} className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500">{item.label}</p>
                      <p className="text-2xl font-black">{item.value}</p>
                      <p className="text-xs font-bold text-teal-600">{item.change} 지난 주 대비</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="mb-6">
            <SectionTitle title="역할별 모드" />
            <div className="grid grid-cols-3 gap-4">
              <RoleCard
                icon={<Users className="h-10 w-10" />}
                title="Patient Mode"
                desc="개인 맞춤 치료 정보와 진행 상황을 확인하세요."
                button="환자 포털 열기"
                tone="blue"
              />
              <RoleCard
                icon={<Stethoscope className="h-10 w-10" />}
                title="Doctor Mode"
                desc="환자 데이터 분석과 치료 의사결정을 지원합니다."
                button="의사 워크스페이스 열기"
                tone="teal"
              />
              <RoleCard
                icon={<Microscope className="h-10 w-10" />}
                title="Researcher Mode"
                desc="연구 데이터 분석과 신약 후보 탐색을 수행하세요."
                button="연구 랩 열기"
                tone="purple"
              />
            </div>
          </Card>

          <Card>
            <SectionTitle title="최근 실험 활동" />
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-black text-slate-500">
                  <tr>
                    <th className="px-4 py-3">실험명</th>
                    <th className="px-4 py-3">대상 단백질</th>
                    <th className="px-4 py-3">실험 유형</th>
                    <th className="px-4 py-3">상태</th>
                    <th className="px-4 py-3">업데이트</th>
                    <th className="px-4 py-3">담당자</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExperiments.map((row) => (
                    <tr key={row.name} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-bold">{row.name}</td>
                      <td className="px-4 py-3">{row.target}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">
                        <Pill
                          tone={
                            row.status === "완료"
                              ? "green"
                              : row.status === "검토 중"
                                ? "orange"
                                : "blue"
                          }
                        >
                          {row.status}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{row.updatedAt}</td>
                      <td className="px-4 py-3">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle title="단백질 구조 미리보기" />
              <Pill tone="gray">KRAS G12D</Pill>
            </div>
            <ProteinVisual compact />
            <div className="mt-4 flex gap-4 text-xs font-bold text-slate-500">
              <span>● 단백질 표면</span>
              <span className="text-teal-600">● 활성 부위</span>
              <span className="text-orange-500">● 결합 리간드</span>
            </div>
          </Card>

          <Card>
            <SectionTitle title="화합물 스크리닝 현황" />
            <div className="flex items-center gap-6">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-blue-600 border-r-teal-500 border-t-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-black">78%</div>
                  <div className="text-xs font-bold text-slate-500">진행률</div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {[
                  ["가상 스크리닝", "12,540 / 16,000", "w-[85%]"],
                  ["상위 화합물 도킹", "1,245 / 2,000", "w-[62%]"],
                  ["ADMET 예측", "980 / 1,500", "w-[70%]"],
                  ["후보 선정", "245 / 500", "w-[50%]"],
                ].map(([label, value, width]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full bg-blue-600 ${width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="알림 및 인사이트" />
            <div className="space-y-3">
              <Insight tone="green" title="KRAS G12D 타겟에서 상위 5% 화합물 발견" />
              <Insight tone="blue" title="EGFR T790M 표적 분석 검토 요청" />
              <Insight tone="orange" title="스토리지 사용량이 85%에 도달했습니다" />
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function RoleCard({
  icon,
  title,
  desc,
  button,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  button: string;
  tone: "blue" | "teal" | "purple";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };

  return (
    <div className={`rounded-3xl border p-5 ${tones[tone]}`}>
      {icon}
      <h3 className="mt-4 text-lg font-black">{title}</h3>
      <p className="mt-2 min-h-[48px] text-sm font-semibold leading-6 text-slate-600">{desc}</p>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-current bg-white/70 px-4 py-3 text-sm font-black">
        {button}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Insight({ title, tone }: { title: string; tone: "green" | "blue" | "orange" }) {
  const toneClass = {
    green: "bg-teal-50 text-teal-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-start gap-3">
        <span className={`rounded-xl px-3 py-1 text-xs font-black ${toneClass[tone]}`}>
          인사이트
        </span>
        <div>
          <p className="text-sm font-black">{title}</p>
          <p className="mt-1 text-xs text-slate-500">20분 전</p>
        </div>
      </div>
    </div>
  );
}
