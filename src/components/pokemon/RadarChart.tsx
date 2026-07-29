'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * 포켓몬 능력치를 레이더 차트로 시각화하는 컴포넌트
 */
interface IProps {
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  chartColor?: string;
}

const RadarChart = ({ stats, chartColor = '#a855f7' }: IProps) => {
  /** 차트 최대값 (포켓몬 능력치 최대값 기준) */
  const MAX_STAT_VALUE = 255;
  /** SVG 캔버스 크기 */
  const CANVAS_SIZE = 300;
  /** 캔버스 중심점 좌표 */
  const CENTER_POINT = CANVAS_SIZE / 2;
  /** 차트 반지름 (캔버스 크기의 40%) */
  const CHART_RADIUS = CANVAS_SIZE * 0.4;

  /** 차트에 표시할 스탯 키 순서 정의 */
  const STAT_KEYS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const;
  /** 차트에 표시할 레이블 순서 */
  const STAT_LABELS = ['HP', 'ATK', 'DEF', 'Sp.A', 'Sp.D', 'SPD'];

  /**
   * 스탯 인덱스와 능력치 값을 기반으로 SVG 상의 (x, y) 좌표 계산
   * @param index 스탯 배열의 인덱스 (0~5)
   * @param value 능력치 값 (0~255)
   * @returns {x, y} 좌표 객체
   */
  const getCoordinates = (index: number, value: number) => {
    // 360도를 6등분하여 각 스탯의 각도 계산 (-90도는 12시 방향 시작을 위함)
    const angle = (Math.PI * 2 * index) / STAT_KEYS.length - Math.PI / 2;
    // 반지름 대비 능력치 비율 계산
    const radius = (CHART_RADIUS * value) / MAX_STAT_VALUE;
    return {
      x: CENTER_POINT + radius * Math.cos(angle),
      y: CENTER_POINT + radius * Math.sin(angle),
    };
  };

  /** 현재 포켓몬의 스탯 좌표들을 문자열로 변환하여 폴리곤 경로 생성 */
  const polygonPoints = STAT_KEYS.map((key, i) => {
    const { x, y } = getCoordinates(i, stats[key]);
    return `${x},${y}`;
  }).join(' ');

  /** 배경 가이드라인(그물망)을 위한 5개의 6각형 생성 */
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className='relative mx-auto aspect-square h-full max-h-[250px] w-full max-w-[250px]'>
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        className='h-full w-full overflow-visible'
        aria-hidden='true'
      >
        {/* 그리드 가이드라인 배경 */}
        {gridLevels.map((level) => (
          <motion.polygon
            key={level}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            points={STAT_KEYS.map((_, i) => {
              const { x, y } = getCoordinates(i, MAX_STAT_VALUE * level);
              return `${x},${y}`;
            }).join(' ')}
            className='fill-none stroke-white/5 stroke-[1]'
          />
        ))}

        {/* 축 가이드라인 */}
        {STAT_KEYS.map((_, i) => {
          const { x, y } = getCoordinates(i, MAX_STAT_VALUE);
          return (
            <line
              key={`axis-${i}`}
              x1={CENTER_POINT}
              y1={CENTER_POINT}
              x2={x}
              y2={y}
              className='stroke-white/5 stroke-[1]'
            />
          );
        })}

        {/* 실제 능력치 데이터 폴리곤 */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 0.2,
          }}
          points={polygonPoints}
          fill={chartColor}
          className='fill-opacity-20 stroke-[3] transition-all duration-500'
          style={{ stroke: chartColor }}
        />

        {/* 각 정점의 데이터 포인트(원) */}
        {STAT_KEYS.map((key, i) => {
          const { x, y } = getCoordinates(i, stats[key]);
          return (
            <motion.circle
              key={`point-${key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              cx={x}
              cy={y}
              r='4'
              fill={chartColor}
              className='filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]'
            />
          );
        })}
      </svg>

      {/* 스탯 레이블 표시 */}
      {STAT_LABELS.map((label, i) => {
        const { x, y } = getCoordinates(i, MAX_STAT_VALUE + 35);
        return (
          <div
            key={label}
            className='absolute text-[10px] font-bold text-gray-500 uppercase tracking-tighter'
            style={{
              left: `${(x / CANVAS_SIZE) * 100}%`,
              top: `${(y / CANVAS_SIZE) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default RadarChart;
