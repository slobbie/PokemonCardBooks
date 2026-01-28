# ⚡ CardVault: Premium Pokemon Collection

![CardVault Banner](https://github.com/user-attachments/assets/1001a15f-454e-4fba-b158-381fa29cecd0)

![CardVault Banner](https://github.com/user-attachments/assets/f3f57a0a-a5e6-4c98-aeb9-36722668ba78)

🍎 **[Live Demo](https://slobbie.github.io/PokemonCardBooks/)**

CardVault는 현대적인 기술 스택으로 구축된 프리미엄 포켓몬 도감 및 덱 빌딩 애플리케이션입니다.

## ✨ 핵심 기능

1.  **실시간 다국어 지원**: 한국어/영어 즉시 전환 및 포켓몬 이름 다국어 표시
2.  **지능형 필터링**: 타입별, 세대별 필터링 및 이름/도감 번호 통합 검색
3.  **나의 덱(My Deck)**: 최대 6마리의 포켓몬으로 나만의 팀 구성 및 능력치 분석
4.  **레이더 차트 분석**: 포켓몬의 종족값을 시각적으로 분석하는 인터랙티브 차트
5.  **무한 스크롤**: 끊김 없는 탐색을 위한 최적화된 데이터 로딩
6.  **즐겨찾기**: 관심 있는 포켓몬을 저장하고 따로 모아보기

## 🛠 기술 스택

- **Core**: `Next.js 15`, `TypeScript 5`, `React 19`
- **State**: `Zustand` (Global State), `TanStack Query v5` (Server State)
- **Styling**: `Tailwind CSS`, `Framer Motion`, `Lucide React`
- **Deployment**: `GitHub Pages` (with GitHub Actions)

## 🏗 프로젝트 구조

```text
src/
├── api/          # API 서비스 및 HttpClient (Wrapper 방식)
├── app/          # Next.js App Router (Pages, Layouts)
├── components/   # Atomic Design (Atoms, Molecules, Organisms)
├── hooks/        # 도메인별 커스텀 훅 (Server State 관리)
├── lib/          # 유틸리티 및 전역 상수
├── store/        # Zustand 전역 상태 저장소
└── types/        # TypeScript 인터페이스 정의
```

## 📦 시작하기

1. **저장소 클론**

   ```bash
   git clone https://github.com/slobbie.github.io/PokemonCardBooks.git
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
