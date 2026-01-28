import type { QueryFunction, QueryKey } from '@tanstack/react-query';
import { IApiMethod, THttpMethod } from '@/types/api';

type TQueryKeyDefinition<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
> = {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
};

type TQueryKeyBuilderReturn<T extends Record<string, IApiMethod>> = {
  _def: readonly [string];
} & {
  [K in keyof T]: T[K]['execute'] extends () => Promise<infer R>
    ? TQueryKeyDefinition<R, readonly [string, K]>
    : (
        ...params: Parameters<T[K]['execute']>
      ) => TQueryKeyDefinition<
        Awaited<ReturnType<T[K]['execute']>>,
        readonly [string, K, ...Parameters<T[K]['execute']>]
      >;
};

/**
 * Query Key 빌더 생성 함수
 * @description TanStack Query와 함께 사용할 쿼리 키를 생성합니다.
 * @param domainName 도메인 이름 (예: 'pokemon')
 * @param apiObject API 객체
 * @returns 쿼리 키 빌더 객체
 */
export const createQueryKeyBuilder = <
  Domain extends string,
  T extends Record<string, IApiMethod>,
>(
  domainName: Domain,
  apiObject: T,
): TQueryKeyBuilderReturn<T> => {
  const queryKeys: Record<string, unknown> = {
    _def: [domainName] as const,
  };

  Object.entries(apiObject).forEach(([key, item]) => {
    if (item.method === 'get') {
      const paramCount = item.execute.length;

      if (paramCount === 0) {
        queryKeys[key] = {
          queryKey: [domainName, key] as const,
          queryFn: item.execute,
        };
      } else {
        queryKeys[key] = (...params: unknown[]) => ({
          queryKey: [domainName, key, ...params] as const,
          queryFn: () => item.execute(...params),
        });
      }
    }
  });

  return queryKeys as TQueryKeyBuilderReturn<T>;
};
