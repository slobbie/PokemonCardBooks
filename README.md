# ⚡ CardVault: Premium Pokemon Collection

![CardVault Banner](https://github.com/user-attachments/assets/1001a15f-454e-4fba-b158-381fa29cecd0)

![CardVault Banner](https://github.com/user-attachments/assets/f3f57a0a-a5e6-4c98-aeb9-36722668ba78)

🍎 **[Live Demo](https://slobbie.github.io/PokemonCardBooks/)**

CardVault는 현대적인 기술 스택으로 구축된 프리미엄 포켓몬 도감 및 덱 빌딩 애플리케이션입니다.

## ✨ 핵심 기능

1.  **다국어 표시**: 한국어/영어 전환 및 포켓몬 이름 표시
2.  **검색 및 필터**: 타입·즐겨찾기 필터와 이름·도감 번호 검색
3.  **덱 구성**: 최대 6마리의 포켓몬 저장 및 능력치 확인
4.  **능력치 시각화**: 포켓몬 종족값을 레이더 차트와 막대로 표시
5.  **목록 탐색**: 필터링된 결과를 20개씩 추가로 표시
6.  **즐겨찾기**: 관심 있는 포켓몬을 저장하고 따로 확인
7.  **반응형 상세 레이아웃**: 데스크톱에서는 이미지 영역을 고정하고, 모바일에서는 단일 열로 표시

## 🛠 기술 스택

- **Core**: `Next.js 16`, `TypeScript 5`, `React 19`
- **State**: `Zustand` (Global State), `TanStack Query v5` (Server State)
- **Styling**: `Tailwind CSS`, `Framer Motion`, `Lucide React`
- **Deployment**: `GitHub Pages` (with GitHub Actions)

## 🔄 데이터 전략

CardVault는 PokeAPI를 런타임 데이터 원본으로 사용합니다. 목록은 필터에 필요한
필드를 GraphQL 단일 요청으로 받고, 상세는 REST API를 병렬 조회합니다.

목록은 여러 포켓몬의 타입·능력치·한국어 이름을 함께 받아야 하므로 REST의 반복
요청을 피할 수 있는 GraphQL을 사용합니다. 상세는 포켓몬·종·진화 체인 REST
리소스가 화면 데이터와 직접 대응하고 호출 수도 적어 REST를 유지합니다.

| 데이터 | 조회 방식 | 갱신 시점 |
| --- | --- | --- |
| 포켓몬 목록 | PokeAPI GraphQL 단일 요청 | 최초 조회 및 5분 캐시 만료 후 |
| 검색·타입·즐겨찾기 필터·정렬 | API 목록 결과를 브라우저에서 조합 | 사용자의 입력 즉시 |
| 포켓몬 상세 | 기본 정보·종 정보를 병렬 조회한 뒤 진화 정보 조회 | 최초 조회 및 5분 캐시 만료 후 |
| 즐겨찾기·나의 덱 | Zustand 상태를 브라우저 저장소에 보존 | 사용자 조작 즉시 |

목록 조회는 REST API의 포켓몬별 상세·종 요청을 반복하지 않습니다. 공식 PokeAPI
GraphQL에서 1세대 151마리의 이름, 타입, 세대, 능력치, 특성을 한 번에 받고 React
Query가 결과를 5분간 캐시합니다. 목록에서 상세로 이동하면 목록 캐시를 먼저 표시하고
백그라운드에서 상세 REST API를 갱신합니다.

검색과 필터는 조건이 바뀔 때마다 API를 호출하지 않습니다. 영문·한국어 이름과 도감
번호 검색, 타입, 즐겨찾기 여부를 독립적으로 조합한 뒤 정렬하고, 무한 스크롤은
필터링된 결과를 20개씩 추가로 표시합니다.

상세 화면은 데스크톱 2열 레이아웃에서 왼쪽 포켓몬 이미지를 내비게이션 아래에
고정하고, 오른쪽의 기본 정보·능력치·진화 정보만 이어서 탐색할 수 있습니다.
`lg` 미만 화면에서는 고정을 해제해 기존 단일 열 스크롤을 유지합니다.

## 🏗 프로젝트 구조

```text
src/
├── app/          # Next.js App Router (Pages, Layouts)
├── entities/     # 포켓몬 도메인 모델과 데이터 훅
├── features/     # 검색·필터 상태와 선택 로직
├── shared/       # 공용 설정과 유틸리티
└── components/   # 점진적으로 이전 중인 UI 컴포넌트
```

## 📦 시작하기

1. **저장소 클론**

   ```bash
   git clone https://github.com/slobbie/PokemonCardBooks.git
   ```

2. **의존성 설치**

   ```bash
   yarn install
   ```

3. **로컬 서버 실행**
   ```bash
   yarn dev
   ```

---

Designed & Developed by **Slobbie**
