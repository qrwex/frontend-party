import { AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager } from 'axios';
import { HttpCodes } from 'shared/constants';
import { logout } from 'store/modules/authentication/actions';
import store from 'store';
import { MappedSuccessResponse } from '../types';

type OnFulfilled<V> = Parameters<AxiosInterceptorManager<V>['use']>[0]
type OnRejected<V> = Parameters<AxiosInterceptorManager<V>['use']>[1]

export const mapApiResponse: OnFulfilled<AxiosResponse> = (response: AxiosResponse) => ({
  response: response && response.data,
}) as MappedSuccessResponse<any> as any;

export const mapApiError: OnRejected<AxiosResponse> = (error) => {
  const { response: { status, statusText, data: { message = '' } = {} } } = error;

  if (status === HttpCodes.Unauthorized) {
    store.dispatch(
      logout(),
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
