'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Input 컴포넌트의 Props 인터페이스
 * 기존 HTML input의 모든 속성을 상속받음
 */
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력창 왼쪽에 표시할 아이콘 */
  icon?: React.ReactNode;
  /** 입력 내용을 지울 때 호출될 핸들러 */
  onClear?: () => void;
  /** 지우기 버튼에 사용할 커스텀 아이콘 */
  clearIcon?: React.ReactNode;
}

/**
 * 프로젝트 전역에서 사용되는 스타일링된 입력창 컴포넌트
 */
const Input = ({ icon, onClear, clearIcon, className, ...props }: IProps) => {
  return (
    <div
      className={cn(
        'flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-purple-500/50 group',
        className,
      )}
    >
      {icon && (
        <div className='mr-2 text-gray-400 group-focus-within:text-purple-500 transition-colors'>
          {icon}
        </div>
      )}
      <input
        className='bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500 focus:ring-0'
        {...props}
      />
      {props.value && onClear && (
        <button onClick={onClear} className='ml-2'>
          {clearIcon || (
            <span className='text-gray-500 hover:text-white transition-colors'>
              ×
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
