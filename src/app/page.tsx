'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

import Navbar from '@/components/organisms/Navbar';
import FilterBar from '@/components/organisms/FilterBar';
import PokemonGrid from '@/components/organisms/home-sections/PokemonGrid';
import EmptyResult from '@/components/organisms/home-sections/EmptyResult';
import ScrollToTopButton from '@/components/organisms/home-sections/ScrollToTopButton';

import { usePokemonCatalog } from '@/entities/pokemon/api/usePokemonCatalog';
import { usePokemonFilterStore } from '@/features/pokemon-filter/model/pokemonFilterStore';
import { selectPokemonCatalog } from '@/features/pokemon-filter/model/selectPokemonCatalog';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { POKEMON_PAGE_SIZE } from '@/shared/config/pagination';

/**
 * 애플리케이션 홈 페이지
 * 포켓몬 목록 조회, 필터링, 검색 및 무한 스크롤 기능을 제공합니다.
 */
const HomePage = () => {
  const {
    language: currentLanguage,
    selectedType,
    searchQuery,
    sortBy,
    selectedGeneration,
    showFavoritesOnly,
    resetFilters,
  } = usePokemonFilterStore();

  const { favorites } = useFavoritesStore();

  const {
    data: pokemonCatalog = [],
    isPending: isInitialLoading,
    isError: hasFetchError,
  } = usePokemonCatalog();

  const { ref: infiniteScrollTriggerRef, inView: isInfiniteScrollVisible } =
    useInView();
  const [isScrollTopButtonVisible, setIsScrollTopButtonVisible] =
    useState(false);
  const [visiblePokemonCount, setVisiblePokemonCount] =
    useState(POKEMON_PAGE_SIZE);

  const translation = {
    ko: {
      moreAvailable: '스크롤하여 포켓몬 더 보기',
      emptyFavorites: '아직 즐겨찾기에 추가된 포켓몬이 없습니다.',
      emptySearch: '조건에 맞는 포켓몬을 찾을 수 없습니다.',
      emptyHint: '필터나 검색어를 조정해 보세요.',
      clearFilters: '필터 초기화',
      errorMessage: '문제가 발생했습니다. 나중에 다시 시도해 주세요.',
    },
    en: {
      moreAvailable: 'Scroll to view more Pokemon',
      emptyFavorites: "You haven't added any favorites yet.",
      emptySearch: 'No Pokemon found matching your criteria.',
      emptyHint: 'Try adjusting your filters or search query.',
      clearFilters: 'Clear All Filters',
      errorMessage: 'Something went wrong. Please try again later.',
    },
  }[currentLanguage];

  /** 브라우저 창 스크롤 위치를 감시하여 '맨 위로 이동' 버튼 표시 여부 결정 */
  useEffect(() => {
    const handleWindowScroll = () => {
      // 스크롤 위치가 1000px 이상일 때 버튼 표시
      setIsScrollTopButtonVisible(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  /** 페이지 최상단으로 부드럽게 스크롤하는 핸들러 */
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredAndSortedPokemon = selectPokemonCatalog(pokemonCatalog, {
    searchQuery,
    selectedType,
    selectedGeneration,
    showFavoritesOnly,
    sortBy,
    favoriteIds: favorites,
  });
  const visiblePokemon = filteredAndSortedPokemon.slice(0, visiblePokemonCount);
  const hasMorePokemon = visiblePokemonCount < filteredAndSortedPokemon.length;

  /** 필터 조건이 바뀌면 목록은 첫 페이지부터 다시 표시합니다. */
  useEffect(() => {
    setVisiblePokemonCount(POKEMON_PAGE_SIZE);
  }, [
    searchQuery,
    selectedType,
    selectedGeneration,
    showFavoritesOnly,
    sortBy,
  ]);

  /** 무한 스크롤은 필터링된 API 결과에서 다음 묶음을 즉시 표시합니다. */
  useEffect(() => {
    if (isInfiniteScrollVisible && hasMorePokemon) {
      setVisiblePokemonCount((current) => current + POKEMON_PAGE_SIZE);
    }
  }, [isInfiniteScrollVisible, hasMorePokemon]);

  /** 목록 API 호출 에러 발생 시 에러 메시지 화면 렌더링 */
  if (hasFetchError) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        <p>{translation.errorMessage}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20'>
        <FilterBar />

        <PokemonGrid
          pokemonList={visiblePokemon}
          isLoading={isInitialLoading}
        />

        {!isInitialLoading && filteredAndSortedPokemon.length === 0 && (
          <EmptyResult
            isFavoritesFilter={showFavoritesOnly}
            onResetFilters={resetFilters}
            labels={{
              emptyFavorites: translation.emptyFavorites,
              emptySearch: translation.emptySearch,
              hint: translation.emptyHint,
              clearFilters: translation.clearFilters,
            }}
          />
        )}

        <div
          ref={infiniteScrollTriggerRef}
          className='mt-12 flex justify-center'
        >
          {hasMorePokemon && !isInitialLoading && (
            <div className='flex items-center gap-2 text-purple-400'>
              <ChevronDown className='w-6 h-6 animate-bounce' />
              <span className='text-sm font-medium'>
                {translation.moreAvailable}
              </span>
            </div>
          )}
        </div>

        <ScrollToTopButton
          isVisible={isScrollTopButtonVisible}
          onScrollToTop={handleScrollToTop}
        />
      </main>
    </div>
  );
};

export default HomePage;
