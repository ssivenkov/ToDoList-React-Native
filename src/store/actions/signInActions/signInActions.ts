import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaActions';
import {
  GetGoogleUserDataActionsType,
  GetGoogleUserDataPayloadType,
  GoogleSignOutActionsType,
  SetSignInStatusActionsType,
} from '@store/actions/signInActions/types';

export const setSignInStatus = (
  signInStatus: string,
): SetSignInStatusActionsType => ({
  type: SIGN_IN_ACTIONS.SET_SIGN_IN_STATUS,
  signInStatus,
});

export const getGoogleUserData = (
  payload: GetGoogleUserDataPayloadType,
): GetGoogleUserDataActionsType => ({
  type: SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA,
  payload,
});

export const GoogleSignOut = (): GoogleSignOutActionsType => ({
  type: SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA,
});
