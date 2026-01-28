'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import IconButton from '@/components/atoms/IconButton';

/**
 * 페이지 최상단 이동 버튼
 */
interface IProps {
  isVisible: boolean;
  onScrollToTop: () => void;
}

const ScrollToTopButton = ({ isVisible, onScrollToTop }: IProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <IconButton
          icon={<ChevronUp className='w-6 h-6' />}
          variant='solid'
          onClick={onScrollToTop}
          className='fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-600/20 z-50 hover:bg-purple-700 transition-colors'
        />
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
