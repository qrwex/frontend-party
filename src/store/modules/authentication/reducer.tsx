import { handleActions } from 'redux-actions';
import { Token } from 'shared/types/user';
import * as AUTHENTICATION_ACTION_TYPES from './constants';

type State = {
  readonly token: Token | null
}

type Payload = {
  token: string;
}

export const DEFAULT_STATE: State = {
  token: null,
};

const reducer = handleActions<State, Payload>({
  [AUTHENTICATION_ACTION_TYPES.SET_TOKEN]: (state, { payload: { token } }) => ({
    ...state,
    token,
  }),
},
DEFAULT_STATE);

export default reducer;
