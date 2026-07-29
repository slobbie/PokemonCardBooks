'use client';

import React, { useState } from 'react';
import { useMyDeckStore } from '@/store/useMyDeckStore';
import DeckDrawer from '@/components/organisms/DeckDrawer';
import { usePokemonFilterStore } from '@/features/pokemon-filter/model/pokemonFilterStore';
import NavLogo from '@/components/molecules/NavLogo';
import NavSearchBar from '@/components/molecules/NavSearchBar';
import NavActions from '@/components/molecules/NavActions';

/**
 * 애플리케이션 상단 네비게이션 바
 */
const Navbar = () => {
  /** 내 덱 상태 관리 스토어에서 덱 목록을 가져옴 */
  const { deck } = useMyDeckStore();
  /** 덱에 포함된 포켓몬 수 계산 */
  const deckCount = deck.length;
  /** 덱 관리 드로어(사이드바) 열림 상태 관리 */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  /** 검색 및 언어 설정을 관리하는 전역 스토어 사용 */
  const { searchQuery, setSearchQuery, language, setLanguage } =
    usePokemonFilterStore();

  /** 현재 언어 설정을 한국어 <-> 영어로 토글하는 함수 */
  const handleLanguageToggle = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <>
      <nav className='fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <NavLogo />
            <NavSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <NavActions
              language={language}
              onLanguageToggle={handleLanguageToggle}
              deckCount={deckCount}
              onDeckOpen={() => setIsDrawerOpen(true)}
            />
          </div>
        </div>
      </nav>

      <DeckDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
