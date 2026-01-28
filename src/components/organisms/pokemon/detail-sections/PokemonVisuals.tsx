'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';

/**
 * 포켓몬 시각 정보 섹션 (이미지 및 이로치 토글)
 */
interface IProps {
  /** 포켓몬 ID */
  pokemonId: number;
  /** 포켓몬 이름 */
  pokemonName: string;
  /** 포켓몬 기본 이미지 URL */
  defaultImage: string;
  /** 빛 효과 색상 */
  glowColor?: string;
  /** 이로치(Shiny) 여부 */
  isShiny: boolean;
  onToggleShiny: () => void;
  /** 버튼 라벨 */
  labels: {
    shiny: string;
    normal: string;
  };
}

const PokemonVisuals = ({
  pokemonId,
  pokemonName,
  defaultImage,
  glowColor,
  isShiny,
  onToggleShiny,
  labels,
}: IProps) => {
  const shinyImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`;

  return (
    <div className='relative group'>
      <div
        className={cn(
          'absolute inset-0 rounded-[40px] blur-[100px] opacity-20 transition-all duration-1000 group-hover:opacity-40',
          glowColor,
        )}
      />
      <div className='glass-card rounded-[40px] p-12 relative overflow-hidden aspect-square flex items-center justify-center border-white/5'>
        <div className='absolute top-6 right-6 flex gap-2'>
          <Button
            variant={isShiny ? 'primary' : 'secondary'}
            size='sm'
            onClick={onToggleShiny}
            className='rounded-full'
          >
            <Sparkles className={cn('w-4 h-4', isShiny && 'fill-white')} />
            {isShiny ? labels.shiny : labels.normal}
          </Button>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={isShiny ? 'shiny' : 'normal'}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className='relative w-full h-full'
          >
            <Image
              src={isShiny ? shinyImage : defaultImage}
              alt={pokemonName}
              fill
              className='object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]'
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PokemonVisuals;
