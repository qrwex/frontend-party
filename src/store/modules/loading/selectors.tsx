/* eslint-disable import/prefer-default-export */
import { State } from 'store';

export const createLoadingSelector = (actions: string[]) => (state: State) => {
  const strippedActions = actions.map((action) => {
    const matches = /(.*)_(REQUEST)/.exec(action);
    if (!matches) {
      throw new Error('Invalid action type. Pass action types with following signature: *_REQUEST');
    }
    return matches[1];
  });
  return strippedActions.some((action) => state.loading[action]);
};
