import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authentication from 'store/modules/authentication/reducer';
import notification from 'store/modules/notification/reducer';
import servers from 'store/modules/servers/reducer';
import { LocationState } from 'history';
import * as ROOT_REDUCER_ACTION_TYPES from './constants';

const appReducer = (history: LocationState) => combineReducers({
  authentication,
  notification,
  router: connectRouter(history),
  servers,
});

export type State = Parameters<ReturnType<typeof appReducer>>[0];

const rootReducer = (history: LocationState) => (state: any, action: any) => (
  appReducer(history)(
    (action.type === ROOT_REDUCER_ACTION_TYPES.RESET_STATE ? undefined : state), action,
  )
);

export default rootReducer;
