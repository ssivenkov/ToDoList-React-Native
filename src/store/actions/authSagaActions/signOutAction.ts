import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';

export type SignOutSagaActionReturnType = {
  type: typeof AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA;
};

export type SignOutActionType = () => SignOutSagaActionReturnType;

export const signOutAction: SignOutActionType = () => ({
  type: AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA,
});
