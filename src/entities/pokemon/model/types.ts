/** 포켓몬 카드와 상세 화면에서 공유하는 도메인 모델입니다. */
export interface IEvolutionDetail {
  species_name: string;
  kr_species_name?: string;
  image: string;
  id: number;
}

export interface IPokemon {
  id: number;
  name: string;
  kr_name?: string;
  types: string[];
  image: string;
  shinyImage?: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  abilities: string[];
  height: number;
  weight: number;
  generation?: number;
  evolutionChain?: IEvolutionDetail[];
}

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
