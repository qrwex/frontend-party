import { fork, put, take } from 'redux-saga/effects';
import * as ROUTER_ACTION_TYPES from 'store/modules/router/constants';
import * as notificationActions from 'store/modules/notification/actions';

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
