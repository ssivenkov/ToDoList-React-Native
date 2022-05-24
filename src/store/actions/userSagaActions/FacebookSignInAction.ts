import {USER_SAGA_ACTION} from '@enums/userSagaEnum';
import {GetUserDataSagaActionPayloadType} from '@store/actions/userSagaActions/GoogleSignInAction';

export type GetFacebookUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.FACEBOOK_SIGN_IN;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetFacebookUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetFacebookUserDataSagaActionReturnType;

export const FacebookSignInAction: GetFacebookUserDataSagaActionType = (
  payload,
) => ({
  type: USER_SAGA_ACTION.FACEBOOK_SIGN_IN,
  payload,
});
