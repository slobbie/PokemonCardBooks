import { createApiWrapper } from '@/api/core/createApiWrapper';
import { commonApi } from '@/api/core/commonApi';
import { IEvolutionDetail, IPokemon } from '@/entities/pokemon/model/types';

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

interface IPokemonSpeciesResponse {
  names: {
    language: { name: string };
    name: string;
  }[];
  evolution_chain: {
    url: string;
  };
}

interface IEvolutionChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: IEvolutionChainNode[];
}

interface IEvolutionChainResponse {
  chain: IEvolutionChainNode;
}

interface IPokemonCatalogGraphqlItem {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: { type: { name: string } }[];
  pokemonstats: { base_stat: number; stat: { name: string } }[];
  pokemonabilities: { ability: { name: string } }[];
  pokemonspecy: {
    generation_id: number;
    pokemonspeciesnames: { name: string }[];
  };
}

interface IPokemonCatalogGraphqlResponse {
  data?: {
    pokemon: IPokemonCatalogGraphqlItem[];
  };
  errors?: { message: string }[];
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

const POKEAPI_GRAPHQL_URL = 'https://graphql.pokeapi.co/v1beta2';
const POKEMON_CATALOG_LIMIT = 151;
const POKEMON_CATALOG_QUERY = `
  query PokemonCatalog($limit: Int!) {
    pokemon(
      limit: $limit
      order_by: { id: asc }
      where: { id: { _lte: $limit }, is_default: { _eq: true } }
    ) {
      id
      name
      height
      weight
      pokemontypes(order_by: { slot: asc }) {
        type { name }
      }
      pokemonstats(order_by: { stat_id: asc }) {
        base_stat
        stat { name }
      }
      pokemonabilities(order_by: { slot: asc }) {
        ability { name }
      }
      pokemonspecy {
        generation_id
        pokemonspeciesnames(where: { language_id: { _eq: 3 } }) {
          name
        }
      }
    }
  }
`;

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

const transformCatalogPokemon = (
  pokemon: IPokemonCatalogGraphqlItem,
): IPokemon => {
  const stats = Object.fromEntries(
    pokemon.pokemonstats.map(({ base_stat, stat }) => [stat.name, base_stat]),
  );

  return {
    id: pokemon.id,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    kr_name: pokemon.pokemonspecy.pokemonspeciesnames[0]?.name,
    types: pokemon.pokemontypes.map(({ type }) => type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    shinyImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`,
    stats: {
      hp: stats.hp ?? 0,
      atk: stats.attack ?? 0,
      def: stats.defense ?? 0,
      spa: stats['special-attack'] ?? 0,
      spd: stats['special-defense'] ?? 0,
      spe: stats.speed ?? 0,
    },
    abilities: pokemon.pokemonabilities.map(({ ability }) => ability.name),
    height: pokemon.height,
    weight: pokemon.weight,
    generation: pokemon.pokemonspecy.generation_id,
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

const getResourceId = (url: string): number =>
  Number(url.split('/').filter(Boolean).pop());

/**
 * 진화 체인 응답을 현재 UI가 사용하는 일렬 구조로 변환합니다.
 * 한국어 이름과 이미지는 목록 API 캐시를 재사용하여 단계별 API 호출을 방지합니다.
 */
const transformEvolutionChain = (
  chain: IEvolutionChainNode,
  catalog: IPokemon[],
  knownKoreanNames: Map<number, string | undefined>,
): Promise<IEvolutionDetail[]> => {
  const evolutionNodes: IEvolutionChainNode[] = [];
  let current: IEvolutionChainNode | undefined = chain;

  while (current) {
    evolutionNodes.push(current);
    current = current.evolves_to[0];
  }

  return Promise.all(
    evolutionNodes.map(async (node) => {
      const id = getResourceId(node.species.url);
      const catalogPokemon = catalog.find((pokemon) => pokemon.id === id);
      const krSpeciesName =
        catalogPokemon?.kr_name ??
        knownKoreanNames.get(id) ??
        (await fetchKoreanName(id));

      return {
        species_name:
          catalogPokemon?.name ??
          node.species.name.charAt(0).toUpperCase() +
            node.species.name.slice(1),
        kr_species_name: krSpeciesName,
        id,
        image:
          catalogPokemon?.image ??
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    }),
  );
};

/**
 * 포켓몬 API
 */
export const pokemonApi = createApiWrapper({
  /** 필터에 필요한 1세대 목록 데이터를 GraphQL 단일 요청으로 조회 */
  getPokemonCatalog: {
    method: 'post',
    execute: async (): Promise<IPokemon[]> => {
      const response = await fetch(POKEAPI_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: POKEMON_CATALOG_QUERY,
          variables: { limit: POKEMON_CATALOG_LIMIT },
        }),
      });

      if (!response.ok) {
        throw new Error(`PokeAPI GraphQL error: ${response.status}`);
      }

      const result =
        (await response.json()) as IPokemonCatalogGraphqlResponse;

      if (result.errors?.length || !result.data) {
        throw new Error(
          result.errors?.map(({ message }) => message).join(', ') ||
            'PokeAPI GraphQL response has no data.',
        );
      }

      return result.data.pokemon.map(transformCatalogPokemon);
    },
  },

  /**
   * 상세 화면 최신 데이터 조회
   * 기본 정보와 종 정보를 병렬로 받고, 진화 단계별 추가 요청은 하지 않습니다.
   */
  getPokemonDetail: {
    method: 'get',
    execute: async (
      idOrName: string | number,
      catalog: IPokemon[],
    ): Promise<IPokemon> => {
      const [pokemonData, speciesData] = await Promise.all([
        commonApi<null, IPokemonDetailResponse>('get', {
          url: `/pokemon/${idOrName}`,
        }),
        commonApi<null, IPokemonSpeciesResponse>('get', {
          url: `/pokemon-species/${idOrName}`,
        }),
      ]);

      const evolutionChainId = getResourceId(speciesData.evolution_chain.url);
      const evolutionChainData = await commonApi<
        null,
        IEvolutionChainResponse
      >('get', {
        url: `/evolution-chain/${evolutionChainId}`,
      });
      const krName = speciesData.names.find(
        (name) => name.language.name === 'ko',
      )?.name;
      const knownKoreanNames = new Map<number, string | undefined>([
        [pokemonData.id, krName],
      ]);

      return {
        ...transformPokemonData(pokemonData),
        kr_name: krName,
        evolutionChain: await transformEvolutionChain(
          evolutionChainData.chain,
          catalog,
          knownKoreanNames,
        ),
      };
    },
  },

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
});
