import {
  call, fork, put, take,
} from 'redux-saga/effects';
import api from 'api';
import { LocationChangeAction, push } from 'connected-react-router';
import PATHS from 'shared/constants/PATHS';
import { reset as resetAppState } from 'store/rootReducer/actions';
import * as AUTHENTICATION_ACTION_TYPES from 'store/modules/authentication/constants';
import * as helpers from './helpers';
import * as actions from './actions';
import * as notificationActions from '../notification/actions';
import { InferApiResult } from '../../types';
import * as ROUTER_ACTION_TYPES from '../router/constants';

type Authorize = InferApiResult<typeof api.user.authorize>;
type Init = ReturnType<typeof actions.init>;
type InitTokenStorage = ReturnType<typeof actions.initTokenStorage>;

function* authorize() {
  while (true) {
    const {
      payload: {
        username, password,
      },
    }: Init = yield take(AUTHENTICATION_ACTION_TYPES.INIT);
    yield put(actions.authRequest());
    const result: Authorize = yield call(api.user.authorize, username, password);
    if (!result.error) {
      const { token } = result.response;
      yield put(actions.initTokenStorage({ token }));
      yield put(actions.authSuccess());
    } else {
      yield put(actions.authFailure());
    }
  }
}

function* authorizeSuccess() {
  while (true) {
    yield take(AUTHENTICATION_ACTION_TYPES.AUTH_SUCCESS);
    yield put(push(PATHS.SERVERS));
  }
}

function* authorizeFailure() {
  while (true) {
    yield take(AUTHENTICATION_ACTION_TYPES.AUTH_FAILURE);
    yield put(notificationActions.setMessage({
      message: 'Incorrect username or password.',
    }));
  }
}

function* logout() {
  while (true) {
    yield take(AUTHENTICATION_ACTION_TYPES.INIT_LOGOUT);
    yield call(helpers.resetLocalStorage);
    yield put(resetAppState());
  }
}

function* setToken() {
  while (true) {
    const {
      payload: { token },
    }: InitTokenStorage = yield take(AUTHENTICATION_ACTION_TYPES.INIT_TOKEN_STORAGE);
    yield call(helpers.setAuthTokenToLocalStorage, token);
    yield put(actions.setToken({ token }));
  }
}

function* omitAuthScreen() {
  while (true) {
    const {
      payload: { location },
    }: LocationChangeAction = yield take(ROUTER_ACTION_TYPES.LOCATION_CHANGE);
    if (location.pathname === PATHS.HOME) {
      const token = helpers.getStoredAuthToken();
      if (token) {
        yield put(push(PATHS.SERVERS));
      }
    }
  }
}

const authenticationSagas = [
  fork(authorize),
  fork(authorizeSuccess),
  fork(authorizeFailure),
  fork(setToken),
  fork(logout),
  fork(omitAuthScreen),
];

export default authenticationSagas;
