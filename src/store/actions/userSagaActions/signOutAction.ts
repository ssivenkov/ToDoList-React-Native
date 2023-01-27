import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';

export type SignOutSagaActionPayloadType = {
  setWaitingProcess: SetStateType<boolean>;
};

export type SignOutSagaActionReturnType = {
  payload: SignOutSagaActionPayloadType;
  type: USER_SAGA_ACTION.SIGN_OUT;
};

export type SignOutActionType = (
  payload: SignOutSagaActionPayloadType,
) => SignOutSagaActionReturnType;

export const signOutAction: SignOutActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.SIGN_OUT,
});
