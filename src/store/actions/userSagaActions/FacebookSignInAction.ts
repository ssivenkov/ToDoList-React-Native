import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type GetFacebookUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.FACEBOOK_SIGN_IN;
};

export type GetFacebookUserDataSagaActionType =
  () => GetFacebookUserDataSagaActionReturnType;

export const facebookSignInAction: GetFacebookUserDataSagaActionType = () => ({
  type: USER_SAGA_ACTION.FACEBOOK_SIGN_IN,
});
