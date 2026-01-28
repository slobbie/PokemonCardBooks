'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

import Navbar from '@/components/organisms/Navbar';
import FilterBar from '@/components/organisms/FilterBar';
import PokemonGrid from '@/components/organisms/home-sections/PokemonGrid';
import EmptyResult from '@/components/organisms/home-sections/EmptyResult';
import ScrollToTopButton from '@/components/organisms/home-sections/ScrollToTopButton';

import { usePokemonList } from '@/hooks/pokemon/usePokemonList';
import { useSearchStore } from '@/store/useSearchStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { IPokemon } from '@/types/pokemon';

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
  } = useSearchStore();

  const { isFavorite } = useFavoritesStore();

  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
    isError: hasFetchError,
  } = usePokemonList(selectedType, selectedGeneration);

  const { ref: infiniteScrollTriggerRef, inView: isInfiniteScrollVisible } =
    useInView();
  const [isScrollTopButtonVisible, setIsScrollTopButtonVisible] =
    useState(false);

  const translation = {
    ko: {
      loadingMore: '포켓몬 더 불러오는 중...',
      emptyFavorites: '아직 즐겨찾기에 추가된 포켓몬이 없습니다.',
      emptySearch: '조건에 맞는 포켓몬을 찾을 수 없습니다.',
      emptyHint: '필터나 검색어를 조정해 보세요.',
      clearFilters: '필터 초기화',
      errorMessage: '문제가 발생했습니다. 나중에 다시 시도해 주세요.',
    },
    en: {
      loadingMore: 'Loading more Pokemon...',
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

  /**  무한 스크롤 트리거 요소가 뷰포트에 들어오면 다음 페이지 데이터 요청 */
  useEffect(() => {
    if (isInfiniteScrollVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [isInfiniteScrollVisible, hasNextPage, fetchNextPage]);

  /** 페이지 최상단으로 부드럽게 스크롤하는 핸들러 */
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** API 호출 에러 발생 시 에러 메시지 화면 렌더링 */
  if (hasFetchError) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        <p>{translation.errorMessage}</p>
      </div>
    );
  }

  /** React Query에서 가져온 여러 페이지의 포켓몬 데이터를 하나의 배열*/
  const allFetchedPokemon: IPokemon[] =
    pokemonListData?.pages.flatMap((page: any) => page.results) ?? [];

  /** 검색어 필터링 로직 (이름 또는 도감 번호 매칭) */
  const matchesSearchQuery = (pokemon: IPokemon): boolean => {
    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery)
    );
  };

  // 즐겨찾기 필터링 로직 (활성화 시 즐겨찾기 목록에 있는 포켓몬만 표시)
  const matchesFavoritesOnly = (pokemon: IPokemon): boolean => {
    // pokemon.id는 number 타입이므로 isFavorite(number)와 일치해야 함
    return showFavoritesOnly ? isFavorite(Number(pokemon.id)) : true;
  };

  /** 정렬 옵션에 따른 비교 함수 (이름순, 공격력순, 스피드순, 번호순) */
  const compareBySortOption = (a: IPokemon, b: IPokemon): number => {
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

  /** 필터링과 정렬을 순차적으로 적용하여 최종 렌더링할 목록 생성 */
  const filteredAndSortedPokemon = [...allFetchedPokemon]
    .filter(
      (pokemon) => matchesSearchQuery(pokemon) && matchesFavoritesOnly(pokemon),
    )
    .sort(compareBySortOption);

  return (
    <div className='min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20'>
        <FilterBar />

        <PokemonGrid
          pokemonList={filteredAndSortedPokemon}
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
          {isFetchingNextPage && (
            <div className='flex items-center gap-2 text-purple-400'>
              <Loader2 className='w-6 h-6 animate-spin' />
              <span className='text-sm font-medium'>
                {translation.loadingMore}
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
