import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type GetUserDataSagaActionPayloadType = {
  setWaitingUserData: SetStateType<boolean>;
};

export type GetGoogleUserDataSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.GOOGLE_SIGN_IN_SAGA;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetGoogleUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetGoogleUserDataSagaActionReturnType;

export const GoogleSignInAction: GetGoogleUserDataSagaActionType = (
  payload,
) => ({
  type: AUTH_SAGA_ACTION.GOOGLE_SIGN_IN_SAGA,
  payload,
});
