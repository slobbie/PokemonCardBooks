'use client';

import React from 'react';
import Link from 'next/link';

/**
 * 네비게이션 바 로고 컴포넌트
 */
const NavLogo = () => {
  return (
    <Link href='/' className='flex items-center gap-2 cursor-pointer group'>
      <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform'>
        P
      </div>
      <span className='font-bold text-xl tracking-tight text-white font-display'>
        CardVault<span className='text-purple-500'>.</span>
      </span>
    </Link>
  );
};

export default NavLogo;
