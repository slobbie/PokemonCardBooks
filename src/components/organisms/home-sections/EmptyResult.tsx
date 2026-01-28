'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import Button from '@/components/atoms/Button';

/**
 * 검색 결과가 없을 때 표시되는 컴포넌트
 */
interface IProps {
  isFavoritesFilter: boolean;
  onResetFilters: () => void;
  labels: {
    emptyFavorites: string;
    emptySearch: string;
    hint: string;
    clearFilters: string;
  };
}

const EmptyResult = ({ isFavoritesFilter, onResetFilters, labels }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='py-24 text-center'
    >
      <div className='inline-flex p-6 rounded-full bg-white/5 mb-6'>
        {/* 필터 모드(즐겨찾기 vs 일반 검색)에 따라 다른 아이콘 표시 */}
        {isFavoritesFilter ? (
          <Heart className='w-12 h-12 text-gray-600' />
        ) : (
          <Search className='w-12 h-12 text-gray-600' />
        )}
      </div>
      {/* 상황에 맞는 결과 없음 메시지 출력 */}
      <p className='text-gray-400 text-lg font-medium'>
        {isFavoritesFilter ? labels.emptyFavorites : labels.emptySearch}
      </p>
      <p className='text-gray-600 text-sm mt-2'>{labels.hint}</p>
      {/* 모든 필터 초기화 버튼 */}
      <Button variant='secondary' onClick={onResetFilters} className='mt-8'>
        {labels.clearFilters}
      </Button>
    </motion.div>
  );
};

export default EmptyResult;
