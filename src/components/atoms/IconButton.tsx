'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * 아이콘 버튼 컴포넌트의 Props 인터페이스
 */
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼에 표시할 아이콘 요소 */
  icon: React.ReactNode;
  /** 버튼 오른쪽 상단에 표시할 배지 숫자 또는 문자 */
  badge?: number | string;
  /** 버튼의 시각적 스타일 종류*/
  variant?: 'ghost' | 'outline' | 'solid';
  /**버튼의 활성화 상태 여부 */
  active?: boolean;
}

/**
 * 아이콘만 포함하거나 배지를 함께 표시하는 전용 버튼 컴포넌트
 */
const IconButton = ({
  icon,
  badge,
  variant = 'ghost',
  active,
  className,
  ...props
}: IProps) => {
  const variants = {
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    outline:
      'border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5',
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
  };

  return (
    <button
      className={cn(
        'relative p-2 rounded-full transition-all active:scale-95',
        variants[variant],
        active && 'text-purple-500',
        className,
      )}
      {...props}
    >
      {icon}
      {badge !== undefined && (
        <span className='absolute top-0 right-0 min-w-[16px] h-4 px-1 bg-purple-500 rounded-full border-2 border-[#0a0a0a] text-[10px] font-bold text-white flex items-center justify-center transform translate-x-1/4 -translate-y-1/4'>
          {badge}
        </span>
      )}
    </button>
  );
};

export default IconButton; // 컴포넌트 기본 내보내기
