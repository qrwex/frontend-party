import { Token } from 'shared/types/user';
import { LocalStorageKeys } from 'shared/constants';

export const getStoredAuthToken = () => localStorage.getItem(LocalStorageKeys.Token);

export const setAuthTokenToLocalStorage = (token: Token) => (
  localStorage.setItem(LocalStorageKeys.Token, token)
);

export const resetLocalStorage = () => (
  localStorage.clear()
);
