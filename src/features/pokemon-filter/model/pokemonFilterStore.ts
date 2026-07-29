import { create } from 'zustand';

export type TSortOption = 'id' | 'name' | 'atk' | 'spe';
export type TLanguage = 'ko' | 'en';

interface IPokemonFilterState {
  language: TLanguage;
  searchQuery: string;
  selectedType: string | null;
  selectedGeneration: number | null;
  showFavoritesOnly: boolean;
  sortBy: TSortOption;
  setLanguage: (lang: TLanguage) => void;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string | null) => void;
  setSelectedGeneration: (gen: number | null) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  setSortBy: (sort: TSortOption) => void;
  resetFilters: () => void;
}

export const usePokemonFilterStore = create<IPokemonFilterState>((set) => ({
  language: 'ko',
  searchQuery: '',
  selectedType: null,
  selectedGeneration: null,
  showFavoritesOnly: false,
  sortBy: 'id',
  setLanguage: (language) => set({ language }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  // 필터는 독립적으로 유지해 타입·세대·즐겨찾기를 함께 사용할 수 있습니다.
  setSelectedType: (selectedType) => set({ selectedType }),
  setSelectedGeneration: (selectedGeneration) => set({ selectedGeneration }),
  setShowFavoritesOnly: (showFavoritesOnly) => set({ showFavoritesOnly }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedType: null,
      selectedGeneration: null,
      showFavoritesOnly: false,
      sortBy: 'id',
    }),
}));
