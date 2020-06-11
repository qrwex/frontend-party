import { handleActions } from 'redux-actions';
import { Servers } from 'shared/types/servers';
import { setLoading } from 'store/helpers';
import * as SERVERS_ACTION_TYPES from 'store/modules/servers/constants';

type State = {
  readonly all: Servers | null;
  readonly loading: boolean;
}

type Payload = {
  all: Servers;
}

export const DEFAULT_STATE: State = {
  all: null,
  loading: false,
};

const reducer = handleActions<State, Payload>({
  [SERVERS_ACTION_TYPES.SET_ALL]: (state, { payload: { all } }) => (
    { ...state, all }
  ),
  [SERVERS_ACTION_TYPES.CLEAR_ALL]: (state) => (
    { ...state, all: null }
  ),
  [SERVERS_ACTION_TYPES.GET_ALL_REQUEST]: (state) => setLoading(state, true),
  [SERVERS_ACTION_TYPES.GET_ALL_SUCCESS]: (state) => setLoading(state, false),
  [SERVERS_ACTION_TYPES.GET_ALL_FAILURE]: (state) => setLoading(state, false),
},
DEFAULT_STATE);

export default reducer;
