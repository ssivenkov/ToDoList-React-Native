import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type GetGoogleUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.GOOGLE_SIGN_IN;
};

export type GetGoogleUserDataSagaActionType = () => GetGoogleUserDataSagaActionReturnType;

export const googleSignInAction: GetGoogleUserDataSagaActionType = () => ({
  type: USER_SAGA_ACTION.GOOGLE_SIGN_IN,
});
