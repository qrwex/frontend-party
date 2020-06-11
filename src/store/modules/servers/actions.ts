import { createAction } from 'redux-actions';
import { Servers } from 'shared/types/servers';
import * as SERVERS_ACTION_TYPES from 'store/modules/servers/constants';

export const getAll = createAction<void>(SERVERS_ACTION_TYPES.GET_ALL);

export const getAllRequest = createAction<void>(SERVERS_ACTION_TYPES.GET_ALL_REQUEST);

export const getAllSuccess = createAction<void>(SERVERS_ACTION_TYPES.GET_ALL_SUCCESS);

export const getAllFailure = createAction<void>(SERVERS_ACTION_TYPES.GET_ALL_FAILURE);

export const setAll = createAction<{ all: Servers }>(SERVERS_ACTION_TYPES.SET_ALL);

export const clearAll = createAction<void>(SERVERS_ACTION_TYPES.CLEAR_ALL);
