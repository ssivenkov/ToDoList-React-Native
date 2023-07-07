import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type GetUserDataSagaPayloadType = {
  email: string;
  password: string;
};

export type GetUserDataSagaActionReturnType = {
  payload: GetUserDataSagaPayloadType;
  type: USER_SAGA_ACTION.SIGN_IN_WITH_EMAIL;
};

export type GetUserDataSagaActionType = (
  payload: GetUserDataSagaPayloadType,
) => GetUserDataSagaActionReturnType;

export const signInWithEmailAction: GetUserDataSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.SIGN_IN_WITH_EMAIL,
});
