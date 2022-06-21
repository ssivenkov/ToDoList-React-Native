import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';

export type GetUserDataSagaActionPayloadType = {
  setWaitingUserData: SetStateType<boolean>;
};

export type GetGoogleUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.GOOGLE_SIGN_IN;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetGoogleUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetGoogleUserDataSagaActionReturnType;

export const googleSignInAction: GetGoogleUserDataSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.GOOGLE_SIGN_IN,
  payload,
});
