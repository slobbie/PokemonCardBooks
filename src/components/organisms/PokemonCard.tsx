'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Star, Heart } from 'lucide-react';
import { TYPE_COLORS, TYPE_GLOWS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMyDeckStore } from '@/store/useMyDeckStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { usePokemonFilterStore } from '@/features/pokemon-filter/model/pokemonFilterStore';
import { useRouter } from 'next/navigation';
import StatBox from '@/components/molecules/StatBox';
import Badge from '@/components/atoms/Badge';
import IconButton from '@/components/atoms/IconButton';
import { IPokemon } from '@/entities/pokemon/model/types';

/**
 * 개별 포켓몬 카드 컴포넌트
 */
interface IProps {
  pokemon: IPokemon;
}

const PokemonCard = ({ pokemon }: IProps) => {
  const { id, name, kr_name, types, image, stats } = pokemon;
  /** 내 덱 관리 상태 및 함수 가져오기 */
  const { addToDeck, removeFromDeck, isInDeck } = useMyDeckStore();
  /** 즐겨찾기 상태 및 함수 가져오기 */
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  /** 현재 언어 설정 가져오기 */
  const { language } = usePokemonFilterStore();

  /** 현재 포켓몬이 덱에 포함되어 있는지 확인 */
  const isSelected = isInDeck(id);
  /** 현재 포켓몬이 즐겨찾기에 포함되어 있는지 확인 */
  const isFav = isFavorite(id);
  const router = useRouter();

  /**설정된 언어에 따라 표시할 이름 결정 */
  const displayName = language === 'ko' && kr_name ? kr_name : name;
  const statsLabel = language === 'ko' ? '기본 능력치' : 'Base Stats';

  /** 덱 추가/제거 토글 핸들러 */
  const handleToggleDeck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromDeck(id);
    } else {
      addToDeck(pokemon);
    }
  };

  /** 즐겨찾기 토글 핸들러 */
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  /** 대표 타입(첫 번째 타입)을 기준으로 시각적 효과 설정 */
  const mainType = types[0].toLowerCase();
  /** 도감 번호 포맷팅 */
  const formattedId = `#${id.toString().padStart(4, '0')}`;
  /** 타입에 따른 글로우 효과 색상 선택 */
  const glowColor = TYPE_GLOWS[mainType] || 'bg-gray-500/20';

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.02}
      className='h-full min-w-0'
    >
      <div
        onClick={() => router.push(`/pokemon/${id}`)}
        className='glass-card rounded-3xl p-5 pb-6 relative group overflow-hidden flex flex-col h-full min-w-0 cursor-pointer'
      >
        <div className='shine-effect'></div>
        <div
          className={cn(
            'absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] -z-10 transition-all duration-500',
            glowColor,
          )}
        ></div>

        <div className='flex justify-between items-start mb-4'>
          <div className='flex gap-1'>
            {types.map((type) => (
              <Badge key={type} variant={type}>
                {type}
              </Badge>
            ))}
          </div>
          <div className='flex gap-1'>
            <IconButton
              icon={
                <Heart
                  className={cn('w-3.5 h-3.5', isFav && 'fill-pink-500')}
                />
              }
              onClick={handleToggleFavorite}
              active={isFav}
              className={
                isFav ? 'text-pink-500' : 'text-white/20 hover:text-pink-400'
              }
            />
            <IconButton
              icon={
                <Star
                  className={cn('w-4 h-4', isSelected && 'fill-purple-500')}
                />
              }
              onClick={handleToggleDeck}
              active={isSelected}
              className={
                isSelected
                  ? 'text-purple-500'
                  : 'text-white/20 hover:text-white'
              }
            />
          </div>
        </div>

        <div className='relative my-2 flex min-h-0 flex-1 items-center justify-center'>
          <Image
            src={image}
            alt={name}
            width={160}
            height={160}
            className='h-auto max-h-[150px] w-auto max-w-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110'
            priority={id <= 20}
          />
        </div>

        <div className='mt-4'>
          <span className='text-xs text-gray-500 font-mono'>{formattedId}</span>
          <h3 className='text-xl font-bold text-white font-display'>
            {displayName}
          </h3>

          <div className='mt-5 border-t border-white/5 pt-4'>
            <p className='mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500'>
              {statsLabel}
            </p>
            <div className='flex min-w-0 gap-2'>
              <StatBox label='ATK' value={stats.atk} />
              <StatBox label='DEF' value={stats.def} />
              <StatBox label='SPD' value={stats.spe} />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default PokemonCard;
