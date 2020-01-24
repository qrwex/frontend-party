/* eslint-disable import/prefer-default-export */
import { Servers } from 'shared/types/servers';
import http from './http';

export const get = () => http.get<Servers>('servers');
