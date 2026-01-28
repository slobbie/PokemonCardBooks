import { IApiMethodConfig, TApiObject } from '@/types/api';

/** 래핑된 API 객체 타입 */
type TWrappedApi<T extends TApiObject> = {
  [K in keyof T]: {
    execute: T[K]['execute'];
    method: T[K]['method'];
  };
};

/**
 * API 래퍼 생성 함수
 * @description API 메서드들을 래핑하여 일관된 인터페이스를 제공합니다.
 * @param apiObject API 메서드 설정 객체
 * @returns 래핑된 API 객체와 HTTP 메서드 정보를 포함한 객체
 */
export const createApiWrapper = <T extends TApiObject>(
  apiObject: T,
): TWrappedApi<T> => {
  const wrapped = {} as TWrappedApi<T>;

  Object.entries(apiObject).forEach(([key, config]) => {
    wrapped[key as keyof T] = {
      execute: config.execute,
      method: config.method,
    } as TWrappedApi<T>[keyof T];
  });

  return wrapped;
};
