import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/api/services/pokemon/pokemonApi';

export const POKEMON_CATALOG_QUERY_KEY = ['pokemon', 'catalog'] as const;

export const fetchPokemonCatalog = () =>
  pokemonApi.getPokemonCatalog.execute();

export const usePokemonCatalog = () => {
  const isBrowser = typeof window !== 'undefined';

  return useQuery({
    queryKey: POKEMON_CATALOG_QUERY_KEY,
    queryFn: fetchPokemonCatalog,
    enabled: isBrowser,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
