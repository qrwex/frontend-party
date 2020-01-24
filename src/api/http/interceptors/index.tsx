import { AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager } from 'axios';
import HTTP_CODES from 'shared/constants/HTTP_CODES';
import { initLogout } from 'store/modules/authentication/actions';
import store from 'store';
import { MappedSuccessResponse } from '../types';

type OnFulfilled<V> = Parameters<AxiosInterceptorManager<V>['use']>[0]
type OnRejected<V> = Parameters<AxiosInterceptorManager<V>['use']>[1]

export const mapApiResponse: OnFulfilled<AxiosResponse> = (response: AxiosResponse) => ({
  response: response && response.data,
}) as MappedSuccessResponse<any> as any;

export const mapApiError: OnRejected<AxiosResponse> = (error) => {
  const { response: { status, statusText, data: { message = '' } = {} } } = error;

  if (status === HTTP_CODES.UNAUTHORIZED) {
    store.dispatch(
      initLogout(),
    );
  }

  return ({
    error: {
      status,
      message: message || statusText,
    },
  });
};

export const addAuthHeaderIfTokenAvailable: OnFulfilled<AxiosRequestConfig> = (request) => {
  const state = store.getState();
  const { token } = state.authentication;
  if (token) {
    request.headers.common.Authorization = token;
  }
  return request;
};
