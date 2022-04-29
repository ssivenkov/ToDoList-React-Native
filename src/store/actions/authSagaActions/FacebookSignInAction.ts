import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';
import {GetUserDataSagaActionPayloadType} from '@store/actions/authSagaActions/GoogleSignInAction';

export type GetFacebookUserDataSagaActionReturnType = {
  type: AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetFacebookUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetFacebookUserDataSagaActionReturnType;

export const FacebookSignInAction: GetFacebookUserDataSagaActionType = (
  payload,
) => ({
  type: AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA,
  payload,
});
