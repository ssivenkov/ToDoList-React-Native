import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type SignOutSagaActionPayloadType = {
  setWaitingSignOut: SetStateType<boolean>;
};

export type SignOutSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.SIGN_OUT_SAGA;
  payload: SignOutSagaActionPayloadType;
};

export type SignOutActionType = (
  payload: SignOutSagaActionPayloadType,
) => SignOutSagaActionReturnType;

export const signOutAction: SignOutActionType = (payload) => ({
  type: AUTH_SAGA_ACTION.SIGN_OUT_SAGA,
  payload,
});
