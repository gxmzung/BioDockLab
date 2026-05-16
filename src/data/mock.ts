export const stats = [
  { label: "활성 실험", value: "128", change: "+12%", type: "blue" },
  { label: "후보 화합물", value: "3,456", change: "+8%", type: "teal" },
  { label: "환자 케이스", value: "782", change: "+15%", type: "purple" },
  { label: "생성된 보고서", value: "214", change: "+6%", type: "orange" },
];

export const recentExperiments = [
  {
    name: "KRAS G12D 억제제 탐색",
    target: "KRAS G12D",
    type: "가상 스크리닝",
    status: "진행 중",
    updatedAt: "2025-05-20 09:15",
    owner: "김서연 박사",
  },
  {
    name: "EGFR T790M 표적 분석",
    target: "EGFR T790M",
    type: "도킹 시뮬레이션",
    status: "검토 중",
    updatedAt: "2025-05-19 17:42",
    owner: "이준호 박사",
  },
  {
    name: "ALK 변이체 화합물 평가",
    target: "ALK L1196M",
    type: "ADMET 예측",
    status: "완료",
    updatedAt: "2025-05-19 11:08",
    owner: "박민지 박사",
  },
  {
    name: "BRAF V600E 신규 리간드",
    target: "BRAF V600E",
    type: "결합 자유 에너지",
    status: "진행 중",
    updatedAt: "2025-05-18 14:33",
    owner: "최한결 연구원",
  },
];

export const dockingResults = [
  {
    rank: 1,
    compoundId: "BDL-10234",
    bindingScore: "-10.28",
    mmgbsa: "-54.32",
    rmsd: "1.21",
    hBond: 3,
    risk: "Low",
  },
  {
    rank: 2,
    compoundId: "BDL-08765",
    bindingScore: "-9.46",
    mmgbsa: "-48.11",
    rmsd: "1.35",
    hBond: 2,
    risk: "Low",
  },
  {
    rank: 3,
    compoundId: "BDL-09123",
    bindingScore: "-8.74",
    mmgbsa: "-42.76",
    rmsd: "1.72",
    hBond: 2,
    risk: "Medium",
  },
  {
    rank: 4,
    compoundId: "BDL-07654",
    bindingScore: "-8.31",
    mmgbsa: "-39.28",
    rmsd: "1.98",
    hBond: 1,
    risk: "Medium",
  },
  {
    rank: 5,
    compoundId: "BDL-06321",
    bindingScore: "-7.89",
    mmgbsa: "-36.54",
    rmsd: "2.11",
    hBond: 1,
    risk: "High",
  },
];

export const treatmentCandidates = [
  {
    name: "BD-201",
    desc: "BioDock 신약 후보",
    efficacy: 72,
    risk: "보통",
    recommend: "높음",
    reason: "EGFR L858R 특이적 결합 강도 우수, 세포 실험에서 높은 억제 효과 확인",
  },
  {
    name: "BD-105",
    desc: "2세대 TKI",
    efficacy: 55,
    risk: "낮음",
    recommend: "보통",
    reason: "기존 2세대 TKI 대비 반응률 개선, 내성 발생 가능성 중간",
  },
  {
    name: "Gefitinib",
    desc: "1세대 TKI",
    efficacy: 32,
    risk: "낮음",
    recommend: "낮음",
    reason: "기존 표준 치료제, 반응률 및 지속기간 제한적",
  },
];
