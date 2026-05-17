# BioDockLab Master Schedule

## 1. 전체 개발 기간

BioDockLab의 현실적인 개발 기간은 **24주, 약 6개월**로 설정한다.

이 일정은 병원 상용 서비스 출시 일정이 아니라, 다음 목표를 위한 일정이다.

- 교수/의료진/간호사/약사/보안 관점 검토
- 역할 기반 의료·바이오 데이터 플랫폼 MVP 개발
- 샘플 데이터 기반 시연 가능 버전 완성
- 보안·개인정보·의료 표현 검토 문서화
- 향후 병원/학과/창업지원단 파일럿 제안 가능 수준의 패키지 완성

## 2. 현재 단계

현재 BioDockLab은 다음 상태다.

- 역할 기반 화면 프로토타입 구현
- 환자/간호사/의사/약사/원무/연구자/보안관리자/플랫폼 관리자 화면 구현
- 권한 없는 접근 차단 흐름 구현
- 감사 로그 및 보안센터 화면 구현
- Protein Atlas / Research UI 확장기획 정리
- 교수님 검토 요청용 PDF 문서 패키지 작성 완료

현재 버전은 **검토용 프로토타입**이며, 실제 의료기관 연동이나 실제 환자 데이터 사용 단계가 아니다.

---

## 3. Phase 0. 현재 완료 단계 — Prototype Evidence Package

기간: 완료

목표:

- BioDockLab의 핵심 방향 증명
- 역할 기반 화면 구현
- 교수님 검토용 자료 작성
- GitHub 문서화

완료된 산출물:

- 한 장 소개서
- 현장 검토 요청서
- 간호사 화면 검토 질문지
- 화면자료 및 연구·교육 확장기획 PDF
- 역할 기반 UI
- Security Center
- Admin Console
- Protein Atlas 확장기획

---

## 4. Phase 1. 전문가 검토 및 문제 재정의

기간: 1~2주차

목표:

- 간호학과 교수님 피드백 확보
- 미국 의사 자문 확보
- 의료 표현 위험도 검토
- 역할별 정보 접근 범위 재정의

주요 작업:

- 교수님 검토 요청 메일 발송
- 미국 의사 자문 질문 전달
- 간호사 화면 피드백 수집
- 환자 설명 문구 위험도 검토
- EMR/간호기록/처방 시스템과의 차이 정리
- 유사 플랫폼 존재 여부 조사
- 미국 병원 보안/audit log 관점 조사

산출물:

- `docs/review/expert_feedback_summary.md`
- `docs/review/medical_expression_risk_list.md`
- `docs/review/us_healthcare_advisor_notes.md`
- `docs/roadmap/revised_product_direction.md`

성공 기준:

- 최소 1명 이상의 의료/간호/의사 자문 확보
- 위험한 표현 목록 작성
- 유지할 기능과 제거할 기능 구분

---

## 5. Phase 2. 제품 범위 재정의 및 UI 정리

기간: 3~5주차

목표:

- BioDockLab의 제품 범위 확정
- 현재 구현 화면 정리
- 상용화 전 단계 MVP 범위 정의

주요 작업:

- 역할별 화면 우선순위 재정리
- 환자 화면에서 진단처럼 보이는 표현 제거
- 간호사 화면 정보 구조 개선
- 약사/원무/보안 화면 정보 범위 정리
- 구현 화면과 콘셉트 화면 분리
- UI 디자인 일관성 개선

산출물:

- `docs/product/MVP_SCOPE.md`
- `docs/product/ROLE_SCREEN_SPEC.md`
- `docs/product/SAFE_MEDICAL_WORDING.md`
- `docs/design/UI_POLISH_PLAN.md`

성공 기준:

- MVP 범위가 1페이지로 설명 가능
- 모든 화면에 “진단/처방 아님” 경계가 반영
- 구현 화면과 확장기획 화면이 명확히 구분됨

---

## 6. Phase 3. 백엔드 구조 재설계

기간: 6~9주차

목표:

- 임시 프로토타입 백엔드에서 MVP용 백엔드 구조로 개선
- 역할 기반 접근제어를 서버 중심으로 강제

주요 작업:

- FastAPI 라우터 분리
- 계정/역할/권한 모델 재설계
- PostgreSQL 또는 SQLite 정리
- Audit Log DB 구조화
- Risk Event 생성 규칙 정리
- Access Policy JSON에서 DB 관리 구조로 확장 검토
- API 문서 자동화

산출물:

- `backend/app/routers/auth.py`
- `backend/app/routers/patient.py`
- `backend/app/routers/clinical.py`
- `backend/app/routers/security.py`
- `backend/app/routers/research.py`
- `docs/architecture/BACKEND_ARCHITECTURE.md`
- `docs/security/AUDIT_LOG_SPEC.md`

성공 기준:

- 권한 체크가 프론트가 아니라 백엔드에서 강제됨
- 역할별 접근 테스트 통과
- Audit Log가 모든 민감 접근에 기록됨

---

## 7. Phase 4. 역할별 MVP 기능 구현

기간: 10~14주차

목표:

- 역할별 화면을 실제 API와 연결
- 샘플 데이터 기반으로 시연 가능한 MVP 완성

주요 작업:

### Patient

- 검사결과 설명 리포트
- 상담 전 질문 리스트
- 증상/복용약/과거력 입력

### Nurse

- 바이탈 요약
- 인수인계 보조
- 투약 전 확인

### Doctor

- 상담 전 요약 리포트
- 환자 질문 리스트
- 위험 신호 표시

### Pharmacist

- 처방량 확인
- 병용약/상호작용 확인
- 복약지도 포인트

### Admin Staff

- 예약
- 동의서
- 서류 상태
- 민감정보 마스킹

### Security

- 접근 로그
- 권한 차단 이벤트
- 내부자 과다열람 의심 이벤트

산출물:

- `docs/product/ROLE_FEATURE_MATRIX.md`
- `docs/demo/MVP_DEMO_FLOW.md`
- `scripts/mvp_smoke_test.py`

성공 기준:

- 환자/간호사/의사/약사/원무/보안관리자 계정별 화면 시연 가능
- 권한 없는 접근이 차단되고 로그가 남음
- 10분 데모 가능

---

## 8. Phase 5. 연구·교육 기능 구현

기간: 15~17주차

목표:

- Protein Atlas와 Virtual Docking Lab을 교육·연구용 기능으로 정리
- 진단/치료 추천이 아닌 학습·연구 보조로 포지셔닝

주요 작업:

- Protein Atlas 화면 구현
- 단백질 기본 정보 카드
- 변이/질환/리간드 연결
- Research Lab 결과표 정리
- 도킹 결과 샘플 데이터 구조화
- 용어 설명 Glossary 추가

산출물:

- `docs/research/PROTEIN_ATLAS_SPEC.md`
- `docs/research/VIRTUAL_DOCKING_LAB_SPEC.md`
- `sample_data/protein_atlas.json`
- `sample_data/docking_samples.json`

성공 기준:

- EGFR, KRAS, BRAF 등 샘플 단백질 탐색 가능
- Research Lab과 Protein Atlas 흐름 연결
- 교육·연구용 화면으로 설명 가능

---

## 9. Phase 6. Case Match / Care Connect 기획 검증

기간: 18~19주차

목표:

- 유사 사례 기반 상담 준비와 온라인 상담 매칭 기능을 실제 구현 전 기획 수준으로 검증
- 자가진단으로 오해되지 않게 표현 정리

주요 작업:

- Case Match 기능 정의
- Care Connect 기능 정의
- 금지 표현 정리
- 의료진 상담 연결 흐름 정리
- 응급 위험 신호 안내 정책 정리
- 미국 의료보험/Telehealth 자문 내용 반영

산출물:

- `docs/product/CASE_MATCH_CONCEPT.md`
- `docs/product/CARE_CONNECT_CONCEPT.md`
- `docs/legal/TELEHEALTH_RISK_NOTES.md`

성공 기준:

- “자가진단” 표현 제거
- “사전문진 기반 온라인 상담 매칭”으로 정의
- 실제 구현 전 법률/의료 자문 필요 항목 정리

---

## 10. Phase 7. 보안·개인정보·컴플라이언스 문서화

기간: 20~21주차

목표:

- 상용화 검토 전 반드시 필요한 보안/개인정보 문서 작성
- 실제 환자 데이터 사용 전 위험 요소 정리

주요 작업:

- 개인정보 흐름도 작성
- 역할별 접근권한 표 작성
- Audit Log 정책 작성
- 민감정보 마스킹 기준 작성
- 비식별 데이터 사용 기준 작성
- 관리자 권한 통제 정책 작성
- 실제 서비스 전 필요한 인증/법률 검토 항목 정리

산출물:

- `docs/security/PRIVACY_DATA_FLOW.md`
- `docs/security/RBAC_POLICY.md`
- `docs/security/INSIDER_THREAT_MODEL.md`
- `docs/security/COMPLIANCE_CHECKLIST.md`

성공 기준:

- 어떤 데이터가 어디서 들어오고 어디에 저장되는지 설명 가능
- 누가 어떤 정보를 볼 수 있는지 표로 설명 가능
- 실제 환자 데이터 사용 전 필요한 검토 항목이 정리됨

---

## 11. Phase 8. 데모 패키지 및 파일럿 제안 준비

기간: 22~24주차

목표:

- 교수님/학과/창업지원단/병원 관계자에게 보여줄 최종 패키지 작성
- GitHub, PPT, PDF, 시연 영상 정리

주요 작업:

- 최종 발표 PPT
- 10분 데모 영상
- GitHub README 정리
- 제품 소개서
- 기술 아키텍처 문서
- 보안 문서
- 전문가 피드백 반영표
- 파일럿 제안서 초안

산출물:

- `docs/pitch/BioDockLab_PITCH_DECK.md`
- `docs/pitch/PILOT_PROPOSAL_DRAFT.md`
- `docs/demo/FINAL_DEMO_RUNBOOK.md`
- `docs/evidence/EXPERT_FEEDBACK_LOG.md`

성공 기준:

- 10분 발표 가능
- 5분 제품 데모 가능
- 교수/전문가 피드백 반영 내역 제시 가능
- 창업지원단 또는 학과 협력 제안 가능

---

## 12. 전체 일정 요약

| 단계 | 기간 | 핵심 목표 |
|---|---:|---|
| Phase 0 | 완료 | 검토용 프로토타입 제작 |
| Phase 1 | 1~2주 | 교수/의사/간호사 피드백 |
| Phase 2 | 3~5주 | 제품 범위와 UI 정리 |
| Phase 3 | 6~9주 | 백엔드/권한 구조 재설계 |
| Phase 4 | 10~14주 | 역할별 MVP 구현 |
| Phase 5 | 15~17주 | Protein Atlas / Research Lab |
| Phase 6 | 18~19주 | Case Match / Care Connect 기획 |
| Phase 7 | 20~21주 | 보안·개인정보 문서화 |
| Phase 8 | 22~24주 | 데모/파일럿 제안 패키지 |

---

## 13. 최종 목표

24주 후 목표는 병원 상용 서비스 출시가 아니다.

24주 후 목표는 다음이다.

1. 역할 기반 의료·바이오 데이터 플랫폼 MVP
2. 교수/의사/간호사 자문 반영
3. 환자·간호사·의사·약사·원무·연구자·보안관리자 화면 시연
4. 보안·개인정보 기본 문서화
5. 교육·연구용 Protein Atlas 시연
6. 창업지원단/학과/병원 관계자에게 제안 가능한 패키지 완성