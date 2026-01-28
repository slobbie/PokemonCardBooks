import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'CardVault | Premium Pokemon Collection',
    template: '%s | CardVault',
  },
  description:
    'Discover and manage your premium Pokemon card collection with real-time stats and dynamic evolution chains.',
  keywords: [
    'Pokemon',
    'Pokemon Cards',
    'Pokedex',
    'Next.js',
    'React',
    'Collection',
  ],
  authors: [{ name: 'Slobbie' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pokemon-card-vault.vercel.app',
    siteName: 'CardVault',
    title: 'CardVault | Premium Pokemon Collection',
    description:
      'Discover and manage your premium Pokemon card collection with real-time stats.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CardVault Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardVault | Premium Pokemon Collection',
    description:
      'Discover and manage your premium Pokemon card collection with real-time stats.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        {/* 외부 폰트 라이브러리(Fontshare) 로드: Clash Display(제목용), Satoshi(본문용) */}
        <link
          href='https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='antialiased'>
        {/* React Query 및 전역 상태 제공을 위한 Providers 래핑 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
