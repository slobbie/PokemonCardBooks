import { create } from 'zustand';

export type TSortOption = 'id' | 'name' | 'atk' | 'spe';

export type TLanguage = 'ko' | 'en';

interface ISearchState {
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

export const useSearchStore = create<ISearchState>((set) => ({
  language: 'ko', // 기본 언어: 한국어
  searchQuery: '', // 기본 검색어: 빈 문자열
  selectedType: null, // 기본 필터: 모든 타입
  selectedGeneration: null, // 기본 필터: 모든 세대
  showFavoritesOnly: false, // 기본 필터: 즐겨찾기 비활성화
  sortBy: 'id', // 기본 정렬: 번호순

  // 언어 설정 업데이트
  setLanguage: (lang: TLanguage) => set({ language: lang }),

  // 검색어 업데이트
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  // 타입 필터 선택 (세대/즐겨찾기 필터와 배타적 작동)
  setSelectedType: (type: string | null) =>
    set({
      selectedType: type,
      selectedGeneration: null,
      showFavoritesOnly: false,
    }),

  // 세대 필터 선택 (타입/즐겨찾기 필터와 배타적 작동)
  setSelectedGeneration: (gen: number | null) =>
    set({
      selectedGeneration: gen,
      selectedType: null,
      showFavoritesOnly: false,
    }),

  // 즐겨찾기 전용 필터 선택 (타입/세대 필터와 배타적 작동)
  setShowFavoritesOnly: (show: boolean) =>
    set({
      showFavoritesOnly: show,
      selectedType: null,
      selectedGeneration: null,
    }),

  // 정렬 기준 변경
  setSortBy: (sort: TSortOption) => set({ sortBy: sort }),

  // 모든 필터 상태 초기화 (초기값으로 복구)
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedType: null,
      selectedGeneration: null,
      showFavoritesOnly: false,
      sortBy: 'id',
    }),
}));
