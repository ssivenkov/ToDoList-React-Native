import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaActions';

export type GoogleAuthCredential = {
  providerId: string;
  token: string;
  secret: string;
};

export type SetSignInStatusActionsType = {
  type: string;
  signInStatus: string;
};

export type GetGoogleUserDataPayloadType = {
  setWaitingGoogleUserData: (status: boolean) => void;
};

export type GetGoogleUserDataActionsType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA;
  payload: GetGoogleUserDataPayloadType;
};

export type GoogleSignOutActionsType = {
  type: typeof SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA;
};

export type SignInActionsType = SetSignInStatusActionsType &
  GetGoogleUserDataActionsType &
  GoogleSignOutActionsType;
