import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';
import {
  GetFacebookUserDataSagaActionType,
  GetGoogleUserDataSagaActionType,
  SignOutSagaActionType,
  GetUserDataPayloadType,
  CreateChannelSagaActionType,
} from '@store/actions/authSagaActions/types';

export const createChannel = (): CreateChannelSagaActionType => ({
  type: AUTH_SAGA_ACTIONS.CREATE_CHANNEL_SAGA,
});

export const GoogleSignIn = (
  payload: GetUserDataPayloadType,
): GetGoogleUserDataSagaActionType => ({
  type: AUTH_SAGA_ACTIONS.GOOGLE_SIGN_IN_SAGA,
  payload,
});

export const FacebookSignIn = (
  payload: GetUserDataPayloadType,
): GetFacebookUserDataSagaActionType => ({
  type: AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA,
  payload,
});

export const signOut = (): SignOutSagaActionType => ({
  type: AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA,
});
