import {
  call, fork, put, take,
} from 'redux-saga/effects';
import api from 'api';
import * as SERVERS_ACTIONS_TYPES from 'store/modules/servers/constants';
import * as actions from 'store/modules/servers/actions';
import { InferApiResult } from 'store/types';

type Get = InferApiResult<typeof api.servers.get>;

function* getAll() {
  while (true) {
    yield take(SERVERS_ACTIONS_TYPES.GET_ALL);
    yield put(actions.getAllRequest());
    const result: Get = yield call(api.servers.get);

    if (!result.error) {
      yield put(actions.setAll({ all: result.response }));
      yield put(actions.getAllSuccess());
    } else {
      yield put(actions.getAllFailure());
    }
  }
}

const authenticationSagas = [
  fork(getAll),
];

export default authenticationSagas;
