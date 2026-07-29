'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import {
  TSortOption,
  usePokemonFilterStore,
} from '@/features/pokemon-filter/model/pokemonFilterStore';
import { POKEMON_TYPES } from '@/features/pokemon-filter/config/pokemonFilterOptions';
import { motion } from 'framer-motion';
import {
  ArrowDownAZ,
  Hash,
  SwatchBook,
  Zap,
  Heart,
  RotateCcw,
} from 'lucide-react';
import Button from '@/components/atoms/Button';

/**
 * 포켓몬 목록 필터 및 정렬 바
 */
const FilterBar = () => {
  const {
    language,
    selectedType,
    setSelectedType,
    resetFilters,
    sortBy,
    setSortBy,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = usePokemonFilterStore();

  /** 언어별 UI 텍스트 설정 */
  const t = {
    ko: {
      favorites: '즐겨찾기만 보기',
      reset: '초기화',
      allTypes: '모든 타입',
      sortBy: '정렬 기준:',
      sortOptions: {
        id: '번호',
        name: '이름',
        atk: '공격력',
        spe: '스피드',
      },
    },
    en: {
      favorites: 'My Favorites Only',
      reset: 'Reset All',
      allTypes: 'All Types',
      sortBy: 'Sort By:',
      sortOptions: {
        id: 'ID',
        name: 'Name',
        atk: 'ATK',
        spe: 'SPD',
      },
    },
  }[language];

  /** 정렬 옵션 구성 (값, 레이블, 아이콘) */
  const sortOptions: {
    label: string;
    value: TSortOption;
    icon: React.ReactNode;
  }[] = [
    {
      label: t.sortOptions.id,
      value: 'id',
      icon: <Hash className='w-3.5 h-3.5' />,
    },
    {
      label: t.sortOptions.name,
      value: 'name',
      icon: <ArrowDownAZ className='w-3.5 h-3.5' />,
    },
    {
      label: t.sortOptions.atk,
      value: 'atk',
      icon: <SwatchBook className='w-3.5 h-3.5' />,
    },
    {
      label: t.sortOptions.spe,
      value: 'spe',
      icon: <Zap className='w-3.5 h-3.5' />,
    },
  ];

  return (
    <div className='space-y-8 mb-12'>
      <div className='flex items-center justify-between'>
        <Button
          variant={showFavoritesOnly ? 'primary' : 'outline'}
          size='sm'
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={cn(
            'px-4 py-2 text-[10px] uppercase tracking-widest transition-all',
            showFavoritesOnly
              ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20'
              : 'text-gray-400',
          )}
        >
          <Heart
            className={cn('w-3.5 h-3.5', showFavoritesOnly && 'fill-white')}
          />
          {t.favorites}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          onClick={resetFilters}
          className='px-4 py-2 text-[10px] uppercase tracking-widest text-gray-500 group'
        >
          <RotateCcw className='w-3.5 h-3.5 group-hover:rotate-[-120deg] transition-transform duration-500' />
          {t.reset}
        </Button>
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button
          variant={selectedType === null ? 'primary' : 'outline'}
          size='sm'
          onClick={() => setSelectedType(null)}
          className={cn(
            'px-4 py-2 text-[10px] uppercase tracking-wider',
            selectedType === null
              ? 'bg-white text-black hover:bg-white/90'
              : 'bg-white/5 border-white/10',
          )}
        >
          {t.allTypes}
        </Button>
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <motion.button
              key={type}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(isSelected ? null : type)}
              className={cn(
                'px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border',
                isSelected
                  ? cn(
                      'text-white border-transparent bg-gradient-to-br shadow-lg',
                      TYPE_COLORS[type],
                    )
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20',
              )}
            >
              {type}
            </motion.button>
          );
        })}
      </div>

      <div className='flex items-center gap-4 py-4 border-t border-white/5'>
        <span className='text-[10px] font-bold text-gray-500 uppercase tracking-widest'>
          {t.sortBy}
        </span>
        <div className='flex gap-2'>
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? 'outline' : 'ghost'}
              size='sm'
              onClick={() => setSortBy(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium',
                sortBy === option.value
                  ? 'bg-purple-600/20 text-purple-400 border-purple-500/30'
                  : 'border-transparent',
              )}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
