import { useQuery, useQueryClient } from '@tanstack/react-query';
import { pokemonApi } from '@/api/services/pokemon/pokemonApi';
import { IPokemon } from '@/entities/pokemon/model/types';
import {
  POKEMON_CATALOG_QUERY_KEY,
} from '@/entities/pokemon/api/usePokemonCatalog';

const POKEMON_DETAIL_STALE_TIME = 5 * 60 * 1000;

const findPokemon = (
  catalog: IPokemon[] | undefined,
  idOrName: string | number,
): IPokemon | undefined => {
  const normalizedIdOrName = String(idOrName).toLowerCase();

  return catalog?.find(
    (pokemon) =>
      String(pokemon.id) === normalizedIdOrName ||
      pokemon.name.toLowerCase() === normalizedIdOrName,
  );
};

/** 목록 API 캐시를 먼저 표시하고 상세 API 데이터로 백그라운드 갱신합니다. */
export const usePokemonDetail = (idOrName: string | number) => {
  const queryClient = useQueryClient();
  const catalog = queryClient.getQueryData<IPokemon[]>(
    POKEMON_CATALOG_QUERY_KEY,
  );
  const catalogPokemon = findPokemon(catalog, idOrName);

  const detailQuery = useQuery({
    queryKey: ['pokemon', 'detail', String(idOrName).toLowerCase()],
    queryFn: () =>
      pokemonApi.getPokemonDetail.execute(idOrName, catalog ?? []),
    enabled: !!idOrName,
    staleTime: POKEMON_DETAIL_STALE_TIME,
    retry: 1,
  });

  const fallbackPokemon = catalogPokemon;

  return {
    ...detailQuery,
    data: detailQuery.data ?? fallbackPokemon,
    isLoading: detailQuery.isLoading && !fallbackPokemon,
    isError: !fallbackPokemon && detailQuery.isError,
    isRefreshing: detailQuery.isFetching && !!fallbackPokemon,
  };
};
