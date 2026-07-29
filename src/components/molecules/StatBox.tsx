'use client';

import React from 'react';

/**
 * 포켓몬 스탯 정보 박스
 */
interface IProps {
  label: string;
  value: number;
}

const StatBox = ({ label, value }: IProps) => {
  return (
    <div className='min-w-0 flex-1 bg-white/5 rounded p-2 text-center border border-white/5'>
      <div className='text-[10px] text-gray-400'>{label}</div>
      <div className='font-bold text-sm text-white'>{value}</div>
    </div>
  );
};

export default StatBox;
