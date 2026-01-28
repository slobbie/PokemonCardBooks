/**
 * 개별 진화 단계 포켓몬 상세 정보 인터페이스
 */
export interface IEvolutionDetail {
  species_name: string; // 종 이름 (영문)
  kr_species_name?: string; // 종 이름 (국문)
  image: string; // 이미지 URL
  id: number; // 포켓몬 고유 ID
}

/**
 * 포켓몬 데이터의 핵심 인터페이스
 */
export interface IPokemon {
  id: number; // 도감 번호
  name: string; // 이름 (영문)
  kr_name?: string; // 이름 (국문)
  types: string[]; // 타입 목록 (예: fire, water)
  image: string; // 기본 이미지 URL
  shinyImage?: string; // 이로치 이미지 URL (선택 사항)
  stats: {
    hp: number; // 체력
    atk: number; // 공격력
    def: number; // 방어력
    spa: number; // 특수공격력
    spd: number; // 특수방어력
    spe: number; // 스피드
  };
  abilities: string[]; // 특성 목록 (영문)
  kr_abilities?: string[]; // 특성 목록 (국문)
  height: number; // 키 (decimeters)
  weight: number; // 몸무게 (hectograms)
  evolutionChain?: IEvolutionDetail[]; // 진화 단계 정보 배열
}

/**
 * 포켓몬 타입 시스템 정의
 */
export type TPokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'dragon'
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'ice'
  | 'dark'
  | 'fairy';
