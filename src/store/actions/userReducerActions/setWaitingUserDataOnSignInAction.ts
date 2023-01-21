import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetWaitingUserDataOnSignInActionPayloadType = {
  isWaitingUserDataOnSignIn: UserReducerStateType['isWaitingUserDataOnSignIn'];
};

export type SetWaitingUserDataOnSignInActionReturnType = {
  type: USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN;
  payload: SetWaitingUserDataOnSignInActionPayloadType;
};

export type SetWaitingUserDataOnSignInActionType = (
  payload: SetWaitingUserDataOnSignInActionPayloadType,
) => SetWaitingUserDataOnSignInActionReturnType;

export const setWaitingUserDataOnSignInAction: SetWaitingUserDataOnSignInActionType = (
  payload,
) => ({
  type: USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN,
  payload,
});
