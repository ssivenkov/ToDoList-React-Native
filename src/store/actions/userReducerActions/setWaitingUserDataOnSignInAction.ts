import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetWaitingUserDataOnSignInActionPayloadType = {
  isWaitingUserDataOnSignIn: UserReducerStateType['isWaitingUserDataOnSignIn'];
};

export type SetWaitingUserDataOnSignInActionReturnType = {
  payload: SetWaitingUserDataOnSignInActionPayloadType;
  type: USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN;
};

export type SetWaitingUserDataOnSignInActionType = (
  payload: SetWaitingUserDataOnSignInActionPayloadType,
) => SetWaitingUserDataOnSignInActionReturnType;

export const setWaitingUserDataOnSignInAction: SetWaitingUserDataOnSignInActionType = (
  payload,
) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN,
});
