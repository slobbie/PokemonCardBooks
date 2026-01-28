import { createQueryKeyBuilder } from '@/api/core/createQueryKeyBuilder';
import { pokemonApi } from '@/api/services/pokemon/pokemonApi';

/**
 * 포켓몬 쿼리 키
 * @description TanStack Query에서 사용할 쿼리 키를 생성합니다.
 */
export const pokemonQueryKey = createQueryKeyBuilder('pokemon', pokemonApi);
