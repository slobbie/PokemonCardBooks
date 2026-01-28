'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Sword, Shield, Zap } from 'lucide-react';
import RadarChart from '@/components/pokemon/RadarChart';
import { TYPE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * 포켓몬 능력치 분석 섹션 (레이더 차트 및 상세 바)
 */
interface IProps {
  /** 능력치 데이터 */
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  /** 주 타입 */
  mainType: string;
  /** 섹션 라벨 */
  label: string;
}

const StatIcon = ({ label }: { label: string }) => {
  switch (label.toLowerCase()) {
    case 'hp':
      return <Heart className='w-4 h-4 text-pink-500' />;
    case 'atk':
      return <Sword className='w-4 h-4 text-red-500' />;
    case 'def':
      return <Shield className='w-4 h-4 text-blue-500' />;
    case 'spa':
      return <Zap className='w-4 h-4 text-yellow-500' />;
    case 'spd':
      return <Shield className='w-4 h-4 text-green-500' />;
    case 'spe':
      return <Activity className='w-4 h-4 text-purple-500' />;
    default:
      return null;
  }
};

/**
 * 포켓몬 능력치 분석 섹션 (레이더 차트 및 상세 바)
 */
interface IProps {
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  /** 주 타입 */
  mainType: string;
  /** 섹션 라벨 */
  label: string;
}

const StatAnalysis = ({ stats, mainType, label }: IProps) => {
  /** 능력치 최대값 기준 (백분율 계산용) */
  const MAX_STAT_VALUE = 255;

  return (
    <div className='glass-card rounded-[32px] p-8 border-white/5 overflow-hidden'>
      <h3 className='text-xl font-bold mb-8 flex items-center gap-2'>
        <Activity className='w-5 h-5 text-purple-500' /> {label}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        <div className='h-[250px] w-full'>
          <RadarChart stats={stats} />
        </div>
        <div className='space-y-4'>
          {Object.entries(stats).map(([statName, statValue]) => (
            <div key={statName} className='space-y-1.5'>
              <div className='flex justify-between items-center px-1'>
                <div className='flex items-center gap-2'>
                  <StatIcon label={statName} />
                  <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>
                    {statName}
                  </span>
                </div>
                <span className='text-sm font-bold text-white'>
                  {statValue}
                </span>
              </div>
              <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(statValue / MAX_STAT_VALUE) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={cn(
                    'h-full bg-gradient-to-r',
                    TYPE_COLORS[mainType.toLowerCase()],
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatAnalysis;
