import { handleActions } from 'redux-actions';
import { Servers } from 'shared/types/servers';
import * as SERVERS_ACTION_TYPES from './constants';

type State = {
  readonly all: Servers | null
}

type Payload = {
  all: Servers
}

export const DEFAULT_STATE: State = {
  all: null,
};

const reducer = handleActions<State, Payload>({
  [SERVERS_ACTION_TYPES.SET_ALL]: (state, { payload: { all } }) => (
    { ...state, all }
  ),
  [SERVERS_ACTION_TYPES.CLEAR_ALL]: (state) => (
    { ...state, all: null }
  ),
},
DEFAULT_STATE);

export default reducer;
