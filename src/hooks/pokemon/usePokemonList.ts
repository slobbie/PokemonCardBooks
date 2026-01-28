import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/api/services/pokemon/pokemonApi';
import { IPokemon } from '@/types/pokemon';

/**
 * 포켓몬 리스트 조회 훅
 * @param selectedType 선택된 타입 (null이면 전체)
 * @param selectedGeneration 선택된 세대 (null이면 전체)
 */
export const usePokemonList = (
  selectedType: string | null,
  selectedGeneration: number | null,
) => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list', selectedType, selectedGeneration],
    queryFn: ({ pageParam }) => {
      /** 특정 타입이 선택된 경우 해당 타입의 포켓몬 목록 조회 */
      if (selectedType) {
        return pokemonApi.getPokemonByType.execute(
          selectedType,
          pageParam as number,
        );
      }
      /** 특정 세대가 선택된 경우 해당 세대의 포켓몬 목록 조회 */
      if (selectedGeneration) {
        return pokemonApi.getPokemonByGeneration.execute(
          selectedGeneration,
          pageParam as number,
        );
      }
      /** 필터가 없는 경우 기본 전체 목록 조회 (무한 스크롤) */
      return pokemonApi.getPokemonList.execute({
        pageParam: pageParam as number,
      });
    },
    initialPageParam: 0,
    /** API 응답에서 받은 차후 페이지 커서를 기반으로 다음 페이지 요청 설정 */
    getNextPageParam: (lastPage: { nextCursor?: number }) =>
      lastPage.nextCursor,
  });
};
