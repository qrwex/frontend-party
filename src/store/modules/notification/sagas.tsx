import { fork, put, take } from 'redux-saga/effects';
import * as ROUTER_ACTION_TYPES from '../router/constants';
import * as notificationActions from './actions';

function* clear() {
  while (true) {
    yield take(ROUTER_ACTION_TYPES.LOCATION_CHANGE);
    yield put(notificationActions.clearMessage());
  }
}

const notificationSagas = [
  fork(clear),
];

export default notificationSagas;
