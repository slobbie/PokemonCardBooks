'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IEvolutionDetail } from '@/types/pokemon';

/**
 * 포켓몬 진화 과정 시각화 섹션
 */
interface IProps {
  /** 진화 단계 데이터 리스트 */
  evolutionChain: IEvolutionDetail[];
  /** 섹션 라벨 */
  label: string;
  /** 한국어 표시 여부 */
  isKorean: boolean;
}

/**
 * 포켓몬 진화 과정 시각화 섹션
 * @param {IProps} props - 진화 단계 데이터 리스트 및 설정
 */
const EvolutionChain = ({ evolutionChain, label, isKorean }: IProps) => {
  const router = useRouter();

  // 진화 정보가 없거나 한 단계뿐이면 표시하지 않음
  if (!evolutionChain || evolutionChain.length <= 1) return null;

  return (
    <div className='glass-card rounded-[32px] p-8 border-white/5'>
      <h3 className='text-xl font-bold mb-8 flex items-center gap-2'>
        <Sparkles className='w-5 h-5 text-yellow-500' /> {label}
      </h3>
      <div className='flex flex-wrap items-center justify-center gap-8 md:gap-4'>
        {evolutionChain.map((evo, index) => (
          <React.Fragment key={evo.id}>
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => router.push(`/pokemon/${evo.id}`)}
              className='group cursor-pointer text-center'
            >
              <div className='relative w-24 h-24 bg-white/5 rounded-2xl border border-white/5 p-4 mb-3 transition-colors group-hover:bg-white/10'>
                <Image
                  src={evo.image}
                  alt={evo.species_name}
                  fill
                  className='object-contain p-2'
                />
              </div>
              <div className='text-center village-wide-text-center'>
                <span className='text-xs font-mono text-gray-500'>
                  #{evo.id.toString().padStart(4, '0')}
                </span>
                <p className='font-bold group-hover:text-purple-400 transition-colors'>
                  {isKorean && evo.kr_species_name
                    ? evo.kr_species_name
                    : evo.species_name}
                </p>
              </div>
            </motion.div>
            {index < evolutionChain.length - 1 && (
              <div className='hidden sm:block h-[2px] w-8 md:w-12 bg-white/10 rounded-full relative'>
                <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-[6px] border-transparent border-l-white/10' />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
