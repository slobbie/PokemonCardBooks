'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '@/components/atoms/Input';

/**
 * 포켓몬 검색 바 컴포넌트
 */
interface IProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const NavSearchBar = ({ searchQuery, onSearchChange }: IProps) => {
  return (
    <Input
      icon={<Search className='w-4 h-4' />}
      placeholder='Search Pokemon...'
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      onClear={() => onSearchChange('')}
      clearIcon={<X className='w-4 h-4' />}
      className='hidden md:flex w-64 focus-within:w-80'
    />
  );
};

export default NavSearchBar;
