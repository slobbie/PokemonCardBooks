'use client';

import { cn } from '@/lib/utils';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-white/5 rounded-2xl', className)} />
);

export const PokemonDetailSkeleton = () => {
  return (
    <div className='min-h-screen bg-[#050505] pt-24 pb-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Back Button Skeleton */}
        <Skeleton className='w-32 h-6 mb-8' />

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
          {/* Left Side Skeleton */}
          <div className='lg:col-span-5 flex flex-col items-center'>
            <Skeleton className='w-full aspect-square max-w-[400px] rounded-[40px]' />
            <div className='mt-8 flex flex-col items-center gap-4 w-full'>
              <Skeleton className='w-20 h-6' />
              <Skeleton className='w-48 h-12' />
              <div className='flex gap-2'>
                <Skeleton className='w-16 h-6 rounded-full' />
                <Skeleton className='w-16 h-6 rounded-full' />
              </div>
              <div className='grid grid-cols-2 w-full gap-4 mt-8'>
                <Skeleton className='h-24 rounded-2xl' />
                <Skeleton className='h-24 rounded-2xl' />
              </div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className='lg:col-span-7 space-y-8'>
            <div className='glass-card rounded-[40px] p-8 space-y-8'>
              <Skeleton className='w-32 h-8' />
              <div className='space-y-6'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='space-y-2'>
                    <div className='flex justify-between'>
                      <Skeleton className='w-20 h-4' />
                      <Skeleton className='w-8 h-4' />
                    </div>
                    <Skeleton className='w-full h-2 rounded-full' />
                  </div>
                ))}
              </div>
            </div>
            <div className='glass-card rounded-[40px] p-8'>
              <Skeleton className='w-40 h-8 mb-8' />
              <div className='flex justify-center gap-8 md:gap-12'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex flex-col items-center gap-4'>
                    <Skeleton className='w-24 h-24 md:w-32 md:h-32 rounded-full' />
                    <Skeleton className='w-20 h-4' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
