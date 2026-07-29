'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IPokemon } from '@/entities/pokemon/model/types';
import PokemonCard from '@/components/organisms/PokemonCard';

/**
 * 포켓몬 목록 그리드 섹션
 */
interface IProps {
  pokemonList: IPokemon[];
  isLoading: boolean;
}

const PokemonGrid = ({ pokemonList, isLoading }: IProps) => {
  return (
    <motion.div
      layout
      className='grid w-full min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[420px]'
    >
      <AnimatePresence mode='popLayout'>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='min-w-0 glass-card rounded-3xl animate-pulse bg-white/5 border border-white/10'
              />
            ))
          : pokemonList.map((pokemon, index) => (
              <motion.div
                layout
                key={`${pokemon.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className='min-w-0'
              >
                <PokemonCard pokemon={pokemon} />
              </motion.div>
            ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PokemonGrid;
