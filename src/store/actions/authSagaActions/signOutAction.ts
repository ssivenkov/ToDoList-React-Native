import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';

export type SignOutSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.SIGN_OUT_SAGA;
};

export type SignOutActionType = () => SignOutSagaActionReturnType;

export const signOutAction: SignOutActionType = () => ({
  type: AUTH_SAGA_ACTION.SIGN_OUT_SAGA,
});
