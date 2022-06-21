import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type CheckUserSagaActionReturnType = {
  type: USER_SAGA_ACTION.CHECK_USER;
};

export type CheckUserSagaActionType = () => CheckUserSagaActionReturnType;

export const checkUserAction: CheckUserSagaActionType = () => ({
  type: USER_SAGA_ACTION.CHECK_USER,
});
