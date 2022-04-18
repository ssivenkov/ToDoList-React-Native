import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';

export type AuthCredentialType = {
  providerId: string;
  token: string;
  secret: string;
};

export type GetUserDataPayloadType = {
  setWaitingUserData: (status: boolean) => void;
};

export type GetGoogleUserDataSagaActionType = {
  type: typeof AUTH_SAGA_ACTIONS.GOOGLE_SIGN_IN_SAGA;
  payload: GetUserDataPayloadType;
};

export type GetFacebookUserDataSagaActionType = {
  type: typeof AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA;
  payload: GetUserDataPayloadType;
};

export type SignOutSagaActionType = {
  type: typeof AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA;
};
