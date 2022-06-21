import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';

export type SignOutSagaActionPayloadType = {
  setWaitingProcess: SetStateType<boolean>;
};

export type SignOutSagaActionReturnType = {
  type: USER_SAGA_ACTION.SIGN_OUT;
  payload: SignOutSagaActionPayloadType;
};

export type SignOutActionType = (
  payload: SignOutSagaActionPayloadType,
) => SignOutSagaActionReturnType;

export const signOutAction: SignOutActionType = (payload) => ({
  type: USER_SAGA_ACTION.SIGN_OUT,
  payload,
});
