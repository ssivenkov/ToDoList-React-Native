import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';

export type CheckUserSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.CHECK_USER;
};

export type CheckUserSagaActionType = () => CheckUserSagaActionReturnType;

export const checkUserAction: CheckUserSagaActionType = () => ({
  type: AUTH_SAGA_ACTION.CHECK_USER,
});
