import { THttpMethod } from '@/types/api';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * API 공통 요청 파라미터 인터페이스
 */
export interface ICommonApiParams<TReq = any> {
  url: string;
  reqBody?: TReq;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * HTTP 클라이언트 인스턴스
 */
export const httpClient = {
  /**
   * 공통 요청 메서드
   * @description 모든 HTTP 요청(GET, POST, PATCH 등)을 단일화하여 처리합니다.
   * @param method HTTP 메서드 (THttpMethod)
   * @param config 요청 설정 (URL, 바디, 쿼리 파라미터, 헤더 등)
   */
  request: async <TRes>(
    method: THttpMethod,
    { url, reqBody, params, headers }: ICommonApiParams,
  ): Promise<TRes> => {
    // 기본 베이스 URL과 엔드포인트를 결합하여 전체 URL 생성
    const fullUrl = new URL(`${BASE_URL}${url}`);

    // 쿼리 파라미터가 있는 경우 URL에 추가
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          fullUrl.searchParams.append(key, String(value));
        }
      });
    }

    // fetch API를 사용하여 실제 네트워크 요청 수행
    const response = await fetch(fullUrl.toString(), {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: reqBody ? JSON.stringify(reqBody) : undefined,
    });

    // HTTP 상태 코드가 성공이 아닌 경우 에러 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    // 응답 본문을 JSON으로 파싱하여 반환
    return response.json();
  },
};

export { BASE_URL };
