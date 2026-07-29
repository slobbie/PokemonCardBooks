import type { Config } from 'tailwindcss';

const config: Config = {
  // 타입별 색상처럼 상수·feature 레이어에서 참조하는 유틸리티 클래스도 생성합니다.
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi)', 'sans-serif'],
        display: ['var(--font-clash)', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'spin-reverse': 'spin 15s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        pokemon: {
          fire: '#ef4444',
          water: '#3b82f6',
          grass: '#10b981',
          electric: '#f59e0b',
          psychic: '#ec4899',
          dragon: '#6366f1',
        },
      },
    },
  },
  plugins: [],
};
export default config;
