import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetAuthStateActionPayloadType = Omit<
  UserReducerStateType,
  'channelID' | 'globalLoader' | 'modalMessage'
>;

export type SetAuthStateActionReturnType = {
  payload: SetAuthStateActionPayloadType;
  type: USER_REDUCER_ACTION.SET_AUTH_STATE;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthStateAction: SetAuthStateActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_AUTH_STATE,
});
