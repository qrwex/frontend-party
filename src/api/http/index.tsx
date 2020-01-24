import axios from 'axios';
import { addAuthHeaderIfTokenAvailable, mapApiError, mapApiResponse } from './interceptors';
import { Service, HTTPResponse as $HTTPResponse } from './types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

instance.interceptors.request.use(addAuthHeaderIfTokenAvailable);
instance.interceptors.response.use(mapApiResponse, mapApiError);

export type HTTPResponse<T = never> = $HTTPResponse<T>;

export default instance as any as Service;
