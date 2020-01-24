import { handleActions } from 'redux-actions';
import * as NOTIFICATION_ACTION_TYPES from './constants';
import { Message } from './types';

type State = {
  readonly message: null | Message
}

type Payload = {
  message: Message;
}

export const DEFAULT_STATE: State = {
  message: null,
};


const reducer = handleActions<State, Payload>({
  [NOTIFICATION_ACTION_TYPES.SET_MESSAGE]: (state, { payload: { message } }) => (
    { ...state, message }
  ),
  [NOTIFICATION_ACTION_TYPES.CLEAR_MESSAGE]: (state) => (
    { ...state, message: null }
  ),
},
DEFAULT_STATE);

export default reducer;
