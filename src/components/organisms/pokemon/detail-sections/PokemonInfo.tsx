'use client';

import React from 'react';
import Badge from '@/components/atoms/Badge';

/**
 * 포켓몬 기본 정보 섹션 (도감번호, 이름, 타입 배지)
 */
interface IProps {
  /** 포켓몬 ID */
  pokemonId: number;
  /** 포켓몬 이름 */
  pokemonName: string;
  /** 포켓몬 타입 리스트 */
  types: string[];
}

const PokemonInfo = ({ pokemonId, pokemonName, types }: IProps) => {
  // 도감 번호를 4자리 숫자로 포맷팅 (예: 1 -> #0001)
  const formattedId = `#${pokemonId.toString().padStart(4, '0')}`;

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <span className='font-mono text-2xl text-white/20 tracking-tighter'>
          {formattedId}
        </span>
        <div className='flex gap-2'>
          {types.map((type) => (
            <Badge key={type} variant={type} className='px-3 py-1 text-xs'>
              {type}
            </Badge>
          ))}
        </div>
      </div>
      <h1 className='text-6xl font-black tracking-tight text-white font-display'>
        {pokemonName}
      </h1>
    </div>
  );
};

export default PokemonInfo;
