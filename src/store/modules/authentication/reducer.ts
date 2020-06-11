import { handleActions } from 'redux-actions';
import { Token } from 'shared/types/user';
import { setLoading } from 'store/helpers';
import * as AUTHENTICATION_ACTION_TYPES from 'store/modules/authentication/constants';

type State = {
  readonly token: Token | null;
  readonly loading: boolean;
}

type Payload = {
  token: string;
}

export const DEFAULT_STATE: State = {
  token: null,
  loading: false,
};

const reducer = handleActions<State, Payload>({
  [AUTHENTICATION_ACTION_TYPES.SET_TOKEN]: (state, { payload: { token } }) => ({
    ...state,
    token,
  }),
  [AUTHENTICATION_ACTION_TYPES.AUTH_REQUEST]: (state) => setLoading(state, true),
  [AUTHENTICATION_ACTION_TYPES.AUTH_FAILURE]: (state) => setLoading(state, false),
  [AUTHENTICATION_ACTION_TYPES.AUTH_SUCCESS]: (state) => setLoading(state, false),
},
DEFAULT_STATE);

export default reducer;
