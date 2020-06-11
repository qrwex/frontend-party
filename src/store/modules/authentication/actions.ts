import { createAction } from 'redux-actions';
import { Password, Token, Username } from 'shared/types/user';
import * as AUTHENTICATION_ACTION_TYPES from 'store/modules/authentication/constants';

export const authorize = createAction<{
  username: Username, password: Password
}>(AUTHENTICATION_ACTION_TYPES.INIT);

export const logout = createAction<void>(AUTHENTICATION_ACTION_TYPES.INIT_LOGOUT);

export const initTokenStorage = createAction<{ token: Token }>(
  AUTHENTICATION_ACTION_TYPES.INIT_TOKEN_STORAGE,
);

export const setToken = createAction<{ token: string }>(AUTHENTICATION_ACTION_TYPES.SET_TOKEN);

export const authRequest = createAction<void>(AUTHENTICATION_ACTION_TYPES.AUTH_REQUEST);

export const authSuccess = createAction<void>(AUTHENTICATION_ACTION_TYPES.AUTH_SUCCESS);

export const authFailure = createAction<void>(AUTHENTICATION_ACTION_TYPES.AUTH_FAILURE);
