'use client';

import React from 'react';
import { Weight, Ruler, Zap } from 'lucide-react';

/**
 * 포켓몬 퀵 스탯 섹션 (몸무게, 키, 특성)
 */
interface IProps {
  /** 몸무게 (hectograms 단위) */
  weight: number;
  /** 키 (decimeters 단위) */
  height: number;
  /** 특성 리스트 */
  abilities: string[];
  /** 라벨 정보 */
  labels: {
    weight: string;
    height: string;
    abilities: string;
  };
}

const QuickStats = ({ weight, height, abilities, labels }: IProps) => {
  // hectograms 단위의 몸무게를 kg으로 변환
  const formattedWeight = (weight / 10).toFixed(1);
  // decimeters 단위의 키를 m로 변환
  const formattedHeight = (height / 10).toFixed(1);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
      <div className='glass-card p-4 rounded-3xl border-white/5'>
        <div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest font-bold mb-2'>
          <Weight className='w-4 h-4' /> {labels.weight}
        </div>
        <div className='text-2xl font-bold'>
          {formattedWeight} <span className='text-sm text-gray-500'>kg</span>
        </div>
      </div>
      <div className='glass-card p-4 rounded-3xl border-white/5'>
        <div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest font-bold mb-2'>
          <Ruler className='w-4 h-4' /> {labels.height}
        </div>
        <div className='text-2xl font-bold'>
          {formattedHeight} <span className='text-sm text-gray-500'>m</span>
        </div>
      </div>
      <div className='glass-card p-4 rounded-3xl border-white/5 col-span-2 sm:col-span-1'>
        <div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest font-bold mb-2'>
          <Zap className='w-4 h-4' /> {labels.abilities}
        </div>
        <div className='flex flex-wrap gap-2'>
          {abilities.map((ability) => (
            <span
              key={ability}
              className='text-sm font-bold text-white capitalize'
            >
              {ability.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
