import { IPokemon } from '@/entities/pokemon/model/types';
import { TSortOption } from './pokemonFilterStore';

interface IPokemonCatalogFilters {
  searchQuery: string;
  selectedType: string | null;
  selectedGeneration: number | null;
  showFavoritesOnly: boolean;
  sortBy: TSortOption;
  favoriteIds: number[];
}

const compareBySortOption = (sortBy: TSortOption) => (a: IPokemon, b: IPokemon) => {
  switch (sortBy) {
    case 'name':
      return a.name.localeCompare(b.name);
    case 'atk':
      return b.stats.atk - a.stats.atk;
    case 'spe':
      return b.stats.spe - a.stats.spe;
    case 'id':
    default:
      return a.id - b.id;
  }
};

export const selectPokemonCatalog = (
  pokemonCatalog: IPokemon[],
  {
    searchQuery,
    selectedType,
    selectedGeneration,
    showFavoritesOnly,
    sortBy,
    favoriteIds,
  }: IPokemonCatalogFilters,
) => {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  return pokemonCatalog
    .filter((pokemon) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        pokemon.name.toLocaleLowerCase().includes(normalizedQuery) ||
        pokemon.kr_name?.toLocaleLowerCase().includes(normalizedQuery) ||
        pokemon.id.toString().includes(normalizedQuery);
      const matchesType = !selectedType || pokemon.types.includes(selectedType);
      const matchesGeneration =
        !selectedGeneration || pokemon.generation === selectedGeneration;
      const matchesFavorite =
        !showFavoritesOnly || favoriteIds.includes(pokemon.id);

      return matchesSearch && matchesType && matchesGeneration && matchesFavorite;
    })
    .sort(compareBySortOption(sortBy));
};
