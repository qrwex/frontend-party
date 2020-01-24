import { createAction } from 'redux-actions';
import * as NOTIFICATION_ACTION_TYPES from './constants';
import { Message } from './types';

export const setMessage = createAction<{ message: Message }>(NOTIFICATION_ACTION_TYPES.SET_MESSAGE);

export const clearMessage = createAction<void>(NOTIFICATION_ACTION_TYPES.CLEAR_MESSAGE);
