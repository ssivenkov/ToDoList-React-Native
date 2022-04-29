import {AUTH_ACTIONS} from '@enums/authEnum';
import {AuthStateType} from '@store/reducers/authReducer/types';

type SetAuthStateActionPayloadType = {
  authState: AuthStateType;
};

export type SetAuthStateActionReturnType = {
  type: AUTH_ACTIONS.SET_AUTH_STATE;
  payload: SetAuthStateActionPayloadType;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthState: SetAuthStateActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_AUTH_STATE,
  payload,
});
