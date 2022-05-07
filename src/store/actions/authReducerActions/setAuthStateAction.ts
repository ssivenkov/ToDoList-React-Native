import {AUTH_ACTION} from '@enums/authEnum';
import {AuthStateType} from '@store/reducers/authReducer/types';

type SetAuthStateActionPayloadType = {
  authState: AuthStateType;
};

export type SetAuthStateActionReturnType = {
  type: AUTH_ACTION.SET_AUTH_STATE;
  payload: SetAuthStateActionPayloadType;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthStateAction: SetAuthStateActionType = (payload) => ({
  type: AUTH_ACTION.SET_AUTH_STATE,
  payload,
});
