import { AxiosInstance, AxiosRequestConfig } from 'axios';

export type MappedSuccessResponse<T> = {
  response: T;
  error?: undefined;
};

export type MappedFailureResponse = {
  response?: undefined;
  error: {
    message: string;
    code: string | number;
  };
};

export type HTTPResponse<T> = Promise<MappedSuccessResponse<T> | MappedFailureResponse>;

export type Service = Omit<AxiosInstance,
  keyof Pick<AxiosInstance, 'get' | 'delete' | 'post' | 'put' | 'patch'>> & {
  get<T = any>(url: string, config?: AxiosRequestConfig): HTTPResponse<T>;
  delete(url: string, config?: AxiosRequestConfig): HTTPResponse<never>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): HTTPResponse<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): HTTPResponse<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): HTTPResponse<T>;
};
