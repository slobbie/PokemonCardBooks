'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';

/**
 * 배지 컴포넌트 (포켓몬 타입 표시 등)
 */
interface IProps {
  /** 배지 내부에 표시될 내용 */
  children: React.ReactNode;
  /** 배지의 타입(변이), 포켓몬 타입 이름 등이 전달됨 */
  variant?: string;
  /**  추가적인 커스텀 스타일 클래스 */
  className?: string;
}

/**
 * 포켓몬 타입 등을 표시하기 위한 공통 배지 컴포넌트
 */
const Badge = ({ children, variant, className }: IProps) => {
  const typeKey = variant?.toLowerCase() || '';
  const bgColor = typeKey ? TYPE_COLORS[typeKey] : 'bg-white/10';

  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white bg-gradient-to-br shadow-sm',
        bgColor,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
