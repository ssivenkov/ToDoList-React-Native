import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {GetUserDataSagaActionPayloadType} from '@store/actions/authSagaActions/GoogleSignInAction';

export type GetFacebookUserDataSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.FACEBOOK_SIGN_IN;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetFacebookUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetFacebookUserDataSagaActionReturnType;

export const FacebookSignInAction: GetFacebookUserDataSagaActionType = (
  payload,
) => ({
  type: AUTH_SAGA_ACTION.FACEBOOK_SIGN_IN,
  payload,
});
