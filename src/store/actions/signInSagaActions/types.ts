import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaEnum';

export type AuthCredentialType = {
  providerId: string;
  token: string;
  secret: string;
};

export type GetGoogleUserDataPayloadType = {
  setWaitingGoogleUserData: (status: boolean) => void;
};

export type GetGoogleUserDataSagaActionType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA;
  payload: GetGoogleUserDataPayloadType;
};

export type GoogleSignOutSagaActionType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA;
};

export type GetFacebookUserDataPayloadType = {
  setWaitingFacebookUserData: (status: boolean) => void;
};

export type GetFacebookUserDataSagaActionType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.GET_FACEBOOK_USER_DATA_SAGA;
  payload: GetFacebookUserDataPayloadType;
};

export type FacebookSignOutSagaActionType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.FACEBOOK_SIGN_OUT_SAGA;
};
