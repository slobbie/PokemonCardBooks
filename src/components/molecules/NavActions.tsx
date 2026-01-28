'use client';

import React from 'react';
import { Languages, Layers } from 'lucide-react';
import { TLanguage } from '@/store/useSearchStore';
import IconButton from '@/components/atoms/IconButton';
import Button from '@/components/atoms/Button';

/**
 * 네비게이션 액션 버튼 그룹 (언어 전환, 덱 열기)
 */
interface IProps {
  /** 현재 언어 */
  language: TLanguage;
  /** 언어 전환 핸들러 */
  onLanguageToggle: () => void;
  /** 덱 개수 */
  deckCount: number;
  /** 덱 열기 핸들러 */
  onDeckOpen: () => void;
}

const NavActions = ({
  language,
  onLanguageToggle,
  deckCount,
  onDeckOpen,
}: IProps) => {
  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={onLanguageToggle}
        className='px-3 py-1.5'
      >
        <Languages className='w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors' />
        <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-400'>
          {language === 'ko' ? 'KR' : 'EN'}
        </span>
      </Button>

      <IconButton
        icon={<Layers className='w-5 h-5' />}
        badge={deckCount > 0 ? deckCount : undefined}
        onClick={onDeckOpen}
      />
    </div>
  );
};

export default NavActions;
