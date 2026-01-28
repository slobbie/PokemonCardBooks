import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IPokemon } from '@/types/pokemon';
import { pokemonApi } from '@/api/services/pokemon/pokemonApi';

/**
 * 포켓몬 상세 조회 훅
 * @param idOrName 포켓몬 ID 또는 이름
 */
export const usePokemonDetail = (
  idOrName: string | number,
): UseQueryResult<IPokemon, Error> => {
  return useQuery({
    queryKey: ['pokemon', 'detail', idOrName],
    queryFn: () => pokemonApi.getPokemonDetail.execute(idOrName),
    enabled: !!idOrName,
  });
};
