/** HTTP 메서드 타입 정의 */
export type THttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/**
 * API 응답 성공 포맷 인터페이스
 * @template T 응답 데이터의 타입
 */
export interface IResponseSuccess<T> {
  data: T; // 실제 반환 데이터
  status: number; // HTTP 상태 코드
}

/**
 * API 메서드 설정을 위한 인터페이스
 */
export interface IApiMethodConfig {
  method: THttpMethod; // 사용할 HTTP 메서드
  // 실제 API 요청을 수행하는 함수 정의
  execute: (...args: any[]) => Promise<any>;
}

/** API 객체 맵핑 타입 (문자열 키와 설정의 쌍) */
export type TApiObject = Record<string, IApiMethodConfig>;

/** API 메서드 기본 인터페이스 */
export interface IApiMethod {
  execute: (...args: any[]) => Promise<any>;
  method: THttpMethod;
}
