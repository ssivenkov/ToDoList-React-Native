import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';

export type CheckUserSagaActionReturnType = {
  type: typeof AUTH_SAGA_ACTIONS.CHECK_USER;
};

export type CheckUserSagaActionType = () => CheckUserSagaActionReturnType;

export const checkUserAction: CheckUserSagaActionType = () => ({
  type: AUTH_SAGA_ACTIONS.CHECK_USER,
});
