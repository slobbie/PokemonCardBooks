import { createApiWrapper } from '@/api/core/createApiWrapper';
import { commonApi } from '@/api/core/commonApi';
import { IPokemon, IEvolutionDetail } from '@/types/pokemon';

/** 포켓몬 리스트 API 응답 인터페이스 */
interface IPokemonListResponse {
  results: { name: string; url: string }[];
  next: string | null;
}

/** 포켓몬 상세 API 응답 인터페이스 */
interface IPokemonDetailResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}

/** 포켓몬 리스트 조회 파라미터 인터페이스 */
interface IGetPokemonListParams {
  pageParam?: number;
}

/** 포켓몬 리스트 조회 결과 인터페이스 */
interface IPokemonListResult {
  results: IPokemon[];
  nextCursor?: number;
}

/**
 * 포켓몬 데이터 변환 함수
 */
const transformPokemonData = (data: IPokemonDetailResponse): IPokemon => {
  return {
    id: data.id,
    // 포켓몬 이름의 첫 글자를 대문자로 변환하여 저장
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    // 타입 정보에서 이름만 추출하여 배열로 저장
    types: data.types.map((t) => t.type.name),
    // 공식 아트워크 이미지를 기본 이미지로 사용
    image: data.sprites.other['official-artwork'].front_default,
    // 복잡한 stats 배열을 직관적인 객체 구조로 변환
    stats: {
      hp: data.stats[0].base_stat,
      atk: data.stats[1].base_stat,
      def: data.stats[2].base_stat,
      spa: data.stats[3].base_stat,
      spd: data.stats[4].base_stat,
      spe: data.stats[5].base_stat,
    },
    // 특성 정보에서 이름만 추출
    abilities: data.abilities.map((a) => a.ability.name),
    height: data.height,
    weight: data.weight,
  };
};

/**
 * 한국어 이름 조회 함수
 */
const fetchKoreanName = async (
  id: number | string,
): Promise<string | undefined> => {
  // 별도의 species API를 호출하여 다국어 정보 조회
  const speciesData = await commonApi<null, any>('get', {
    url: `/pokemon-species/${id}`,
  });
  // 이름 목록 중 한국어(ko) 데이터만 필터링
  return speciesData.names.find(
    (n: { language: { name: string }; name: string }) =>
      n.language.name === 'ko',
  )?.name;
};

/**
 * 진화 체인 파싱 함수
 */
const parseEvolutionChain = async (chain: any): Promise<IEvolutionDetail[]> => {
  const result: IEvolutionDetail[] = [];
  let current = chain;

  // 재귀 구조의 진화 체인을 순회하며 필요한 데이터 추출
  while (current) {
    const speciesName = current.species.name;
    // URL에서 포켓몬 고유 ID 추출
    const id = current.species.url.split('/').filter(Boolean).pop();
    // 각 진화 단계 포켓몬의 한국어 이름 조회
    const krSpeciesName = await fetchKoreanName(id);

    result.push({
      species_name: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
      kr_species_name: krSpeciesName,
      id: Number(id),
      // 고해상도 아트워크 이미지 URL 구성
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    });
    // 다음 진화 단계로 이동 (복기: 첫 번째 진화 분기만 처리)
    current = current.evolves_to[0];
  }

  return result;
};

/**
 * 포켓몬 API
 */
export const pokemonApi = createApiWrapper({
  /** 포켓몬 리스트 조회 */
  getPokemonList: {
    method: 'get',
    execute: async ({
      pageParam = 0,
    }: IGetPokemonListParams): Promise<IPokemonListResult> => {
      const limit = 20;
      const offset = pageParam * limit;

      const data = await commonApi<null, IPokemonListResponse>('get', {
        url: '/pokemon',
        params: { limit, offset },
      });

      const results = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
          const details = await commonApi<null, IPokemonDetailResponse>('get', {
            url: `/pokemon/${pokemonId}`,
          });
          const krName = await fetchKoreanName(details.id);

          return {
            ...transformPokemonData(details),
            kr_name: krName,
          };
        }),
      );

      return {
        results,
        nextCursor: data.next ? pageParam + 1 : undefined,
      };
    },
  },

  /** 타입별 포켓몬 조회 */
  getPokemonByType: {
    method: 'get',
    execute: async (
      type: string,
      pageParam = 0,
    ): Promise<IPokemonListResult> => {
      const data = await commonApi<null, any>('get', {
        url: `/type/${type}`,
      });

      const limit = 20;
      const offset = pageParam * limit;
      const pagedResults = data.pokemon.slice(offset, offset + limit);

      const results = await Promise.all(
        pagedResults.map(async (p: { pokemon: { url: string } }) => {
          const pokemonId = p.pokemon.url.split('/').filter(Boolean).pop();
          const details = await commonApi<null, IPokemonDetailResponse>('get', {
            url: `/pokemon/${pokemonId}`,
          });
          const krName = await fetchKoreanName(details.id);

          return {
            ...transformPokemonData(details),
            kr_name: krName,
          };
        }),
      );

      return {
        results,
        nextCursor:
          data.pokemon.length > offset + limit ? pageParam + 1 : undefined,
      };
    },
  },

  /** 세대별 포켓몬 조회 */
  getPokemonByGeneration: {
    method: 'get',
    execute: async (
      genId: number,
      pageParam = 0,
    ): Promise<IPokemonListResult> => {
      const data = await commonApi<null, any>('get', {
        url: `/generation/${genId}`,
      });

      const limit = 20;
      const offset = pageParam * limit;
      const pagedResults = data.pokemon_species.slice(offset, offset + limit);

      const results = await Promise.all(
        pagedResults.map(async (species: { name: string; url: string }) => {
          const id = species.url.split('/').filter(Boolean).pop();
          const details = await commonApi<null, IPokemonDetailResponse>('get', {
            url: `/pokemon/${id}`,
          });
          const krName = await fetchKoreanName(id as string);

          return {
            ...transformPokemonData(details),
            kr_name: krName,
          };
        }),
      );

      return {
        results,
        nextCursor:
          data.pokemon_species.length > offset + limit
            ? pageParam + 1
            : undefined,
      };
    },
  },

  /** 포켓몬 상세 조회 */
  getPokemonDetail: {
    method: 'get',
    execute: async (idOrName: string | number): Promise<IPokemon> => {
      const data = await commonApi<null, IPokemonDetailResponse>('get', {
        url: `/pokemon/${idOrName}`,
      });

      const speciesData = await commonApi<null, any>('get', {
        url: `/pokemon-species/${idOrName}`,
      });

      const krName = speciesData.names.find(
        (n: { language: { name: string }; name: string }) =>
          n.language.name === 'ko',
      )?.name;

      const evolutionChainId = speciesData.evolution_chain.url
        .split('/')
        .filter(Boolean)
        .pop();
      const evolutionChainData = await commonApi<null, any>('get', {
        url: `/evolution-chain/${evolutionChainId}`,
      });
      const evolutionChain = await parseEvolutionChain(
        evolutionChainData.chain,
      );

      return {
        ...transformPokemonData(data),
        kr_name: krName,
        evolutionChain,
      };
    },
  },
});
