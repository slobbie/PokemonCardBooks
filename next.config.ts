import type { NextConfig } from 'next';
import { APP_BASE_PATH } from './src/shared/config/appPaths';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? APP_BASE_PATH : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isProduction ? `${APP_BASE_PATH}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
      },
    ],
  },
};

export default nextConfig;
