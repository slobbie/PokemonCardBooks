'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * 버튼 컴포넌트의 Props 인터페이스
 */
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**버튼의 시각적 스타일 종류 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** 버튼의 크기 종류 */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 내부에 렌더링될 요소 */
  children: React.ReactNode;
}

/**
 * 프로젝트 공통 버튼 컴포넌트
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: IProps) => {
  const variants = {
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    outline:
      'border border-white/10 text-white hover:border-purple-500/50 hover:bg-purple-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
