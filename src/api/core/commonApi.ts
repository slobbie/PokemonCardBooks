import { THttpMethod, IApiMethodConfig } from '@/types/api';
import { httpClient, ICommonApiParams } from '@/api/core/httpClient';

/**
 * 공통 API 요청 함수
 * @description httpClient를 사용하여 실제 요청을 수행하며, 서비스 계층에서 주로 호출합니다.
 * @template TReq 요청 바디의 타입
 * @template TRes 응답 데이터의 타입
 */
export const commonApi = async <TReq, TRes>(
  method: THttpMethod,
  params: ICommonApiParams<TReq>,
): Promise<TRes> => {
  // httpClient의 통합 request 메서드를 호출하여 결과 반환
  return httpClient.request<TRes>(method, params);
};
