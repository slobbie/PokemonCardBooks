import PokemonDetailClient from './PokemonDetailClient';

/**
 * 정적 페이지 생성을 위한 파라미터 정의
 * @description GitHub Pages 배포(output: 'export') 시 다이나믹 라우트 처리를 위해 필요합니다.
 * 포켓몬 도감의 기본 범위(1~151)를 정적으로 생성하도록 설정합니다.
 */
export async function generateStaticParams() {
  // 초기 1세대 포켓몬 151마리의 ID를 기반으로 정적 경로 생성
  return Array.from({ length: 151 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

/**
 * 포켓몬 상세 정보 페이지
 * 서버 컴포넌트로 유지하면서 클라이언트 로직을 분리하여 'use client'와 'generateStaticParams' 충돌을 피합니다.
 */
const PokemonDetailPage = () => {
  return <PokemonDetailClient />;
};

export default PokemonDetailPage;
