import { Password, Token, Username } from 'shared/types/user';
import http from './http';

export const authorize = (username: Username, password: Password) => (
  http.post<{ token: Token }>('tokens', { username, password })
);
