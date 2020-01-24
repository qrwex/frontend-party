/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import * as ROOT_REDUCER_ACTION_TYPES from './constants';

export const reset = createAction<void>(ROOT_REDUCER_ACTION_TYPES.RESET_STATE);
