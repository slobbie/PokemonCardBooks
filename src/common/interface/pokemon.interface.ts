/** 포켓몬 데이터 인터페이스 */
export interface PokeMonDataInterface {
  id?: number;
  name?: string;
  img?: string;
  front_img?: string;
  back_img?: string;
  type?: string;
  color?: string;
  text?: string;
  genera?: string;
  height?: number;
  weight?: number;
}

/** 포멧몬 url 반환 api 인터페이스 */
export interface IGetPokeCountUrl {
  name: string;
  url: string;
}

export interface IGetPokeCountUrlResult {
  results: IGetPokeCountUrl[];
}

export interface PokeMonsterData {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
    other: any;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
}

export interface IFlavorTextEntries {
  flavor_text: string;
  language: { name: string; url: string };
}

export interface IPokeMonsterDetailData {
  names: {
    language: { name: string; url: string };
    name: string;
  }[];
  color: {
    name: string;
    url: string;
  };
  flavor_text_entries: IFlavorTextEntries[];
  genera: {
    genus: string;
    language: { name: string; url: string };
  }[];
}
