import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 네임 병합 유틸리티
 * @description clsx로 클래스를 조건부로 결합하고, tailwind-merge로 중복되거나 충돌하는 클래스를 최적화합니다.
 */
export function cn(...inputs: ClassValue[]) {
  // clsx로 인자들을 합친 후 twMerge를 통해 Tailwind 클래스 우선순위 정리
  return twMerge(clsx(inputs));
}
