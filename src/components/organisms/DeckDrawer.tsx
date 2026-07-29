'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Activity } from 'lucide-react';
import { useMyDeckStore } from '@/store/useMyDeckStore';
import { IPokemon } from '@/entities/pokemon/model/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { usePokemonFilterStore } from '@/features/pokemon-filter/model/pokemonFilterStore';
import IconButton from '@/components/atoms/IconButton';
import Button from '@/components/atoms/Button';

/**
 * 내 덱 관리 사이드바 드로어
 */
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeckDrawer = ({ isOpen, onClose }: IProps) => {
  /** 내 덱 상태와 덱에서 제거하는 함수를 가져옴 */
  const { deck, removeFromDeck } = useMyDeckStore();
  /** 현재 UI 언어 설정을 가져옴 */
  const { language } = usePokemonFilterStore();
  /** 페이지 이동을 위한 Next.js 라우터 */
  const router = useRouter();

  /** 덱 전체 포켓몬의 능력치 합계 계산 */
  const teamStats = deck.reduce(
    (acc: Record<string, number>, pokemon: IPokemon) => {
      acc.hp += pokemon.stats.hp;
      acc.atk += pokemon.stats.atk;
      acc.def += pokemon.stats.def;
      acc.spa += pokemon.stats.spa;
      acc.spd += pokemon.stats.spd;
      acc.spe += pokemon.stats.spe;
      return acc;
    },
    { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } as Record<string, number>,
  );

  /** 덱 전체 포켓몬의 평균 능력치 계산 */
  const avgStats =
    deck.length > 0
      ? (Object.entries(teamStats) as [string, number][]).reduce(
          (acc: Record<string, number>, [key, val]) => {
            acc[key] = Math.round(val / deck.length);
            return acc;
          },
          {} as Record<string, number>,
        )
      : null;

  /** 덱 내 포켓몬들의 타입 분포(중복 포함) 계산 */
  const typeDistribution = deck.reduce(
    (acc: Record<string, number>, pokemon: IPokemon) => {
      pokemon.types.forEach((type: string) => {
        const t = type.toLowerCase();
        acc[t] = (acc[t] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  /** 많이 포함된 타입 순으로 정렬 */
  const sortedTypes = (
    Object.entries(typeDistribution) as [string, number][]
  ).sort((a, b) => b[1] - a[1]);

  /** 언어별 다국어 텍스트 정의 */
  const t = {
    ko: {
      title: '나의 덱',
      empty: '덱이 비어 있습니다. 포켓몬을 추가하여 팀을 구성해보세요!',
      synergy: '팀 시너지 점수',
      stats: '팀 평균 능력치',
      remove: '삭제',
      startAnalysis: '배틀 분석 시작',
      viewDetails: '상세보기',
    },
    en: {
      title: 'My Deck',
      empty: 'Your deck is empty. Add some Pokemon to build your team!',
      synergy: 'Team Synergy Score',
      stats: 'Team Average Stats',
      remove: 'Remove',
      startAnalysis: 'Start Battle Analysis',
      viewDetails: 'View Details',
    },
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]'
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl flex flex-col'
          >
            <div className='p-6 border-b border-white/10 flex items-center justify-between'>
              <h2 className='text-3xl font-bold font-display'>{t.title}</h2>
              <IconButton icon={<X className='w-6 h-6' />} onClick={onClose} />
            </div>

            <div className='flex-1 overflow-y-auto p-6 space-y-6'>
              {deck.length > 0 && avgStats && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-purple-600/10 border border-purple-500/20 rounded-2xl p-4 mb-2'
                >
                  <h3 className='text-sm font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2'>
                    <Activity className='w-4 h-4' /> {t.stats}
                  </h3>
                  <div className='grid grid-cols-3 gap-3'>
                    {Object.entries(avgStats).map(
                      ([key, value]: [string, any]) => (
                        <div key={key} className='text-center'>
                          <div className='text-[10px] text-gray-500 uppercase'>
                            {key}
                          </div>
                          <div className='text-sm font-bold text-white'>
                            {value}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {deck.length > 0 && sortedTypes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='bg-white/[0.02] border border-white/5 rounded-2xl p-4'
                >
                  <h3 className='text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3'>
                    Type Distribution
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {sortedTypes.map(([type, count]) => (
                      <div
                        key={type}
                        className={cn(
                          'px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1.5 border border-white/5',
                          TYPE_COLORS[type]
                            ?.split(' ')[0]
                            .replace('from-', 'bg-')
                            .replace('to-', ''),
                        )}
                      >
                        <span className='text-white'>{type}</span>
                        <span className='w-4 h-4 rounded-md bg-black/20 flex items-center justify-center text-white/80'>
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {deck.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-[60vh] text-center px-6'>
                  <div className='w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6'>
                    <Trash2 className='w-10 h-10 text-gray-600' />
                  </div>
                  <p className='text-gray-400 font-medium'>{t.empty}</p>
                </div>
              ) : (
                deck.map((pokemon: IPokemon) => (
                  <motion.div
                    layout
                    key={pokemon.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className='glass-card p-4 rounded-2xl flex items-center gap-4 group relative overflow-hidden'
                  >
                    <div className='relative w-20 h-20 bg-white/5 rounded-xl border border-white/5 p-2 flex-shrink-0'>
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        fill
                        className='object-contain p-2'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-[10px] font-mono text-gray-500'>
                          #{pokemon.id.toString().padStart(4, '0')}
                        </span>
                        <button
                          onClick={() => removeFromDeck(pokemon.id)}
                          className='text-[10px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-colors'
                        >
                          {t.remove}
                        </button>
                      </div>
                      <h4 className='font-bold text-lg mb-2'>
                        {language === 'ko' && pokemon.kr_name
                          ? pokemon.kr_name
                          : pokemon.name}
                      </h4>
                      <button
                        onClick={() => {
                          router.push(`/pokemon/${pokemon.id}`);
                          onClose();
                        }}
                        className='text-[11px] text-gray-500 hover:text-white flex items-center gap-1 mt-1 transition-colors'
                      >
                        {t.viewDetails} <ArrowRight className='w-3 h-3' />
                      </button>
                    </div>
                    <IconButton
                      icon={<Trash2 className='w-5 h-5' />}
                      onClick={() => removeFromDeck(pokemon.id)}
                      className='hover:text-red-500 hover:bg-red-500/10'
                    />
                  </motion.div>
                ))
              )}
            </div>

            {deck.length > 0 && (
              <div className='p-6 border-t border-white/10 bg-white/[0.02]'>
                <Button className='w-full py-4' size='lg'>
                  {t.startAnalysis}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeckDrawer;
