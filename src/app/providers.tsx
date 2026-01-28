'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // QueryClient 인스턴스를 상태로 관리하여 컴포넌트 리렌더링 시에도 유지되도록 함
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터가 'stale' 하다고 판단되는 시간 설정 (60초)
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    // 애플리케이션 전체에 React Query 컨텍스트 제공
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
