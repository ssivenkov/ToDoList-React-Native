import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaEnum';
import {
  FacebookSignOutSagaActionType,
  GetFacebookUserDataSagaActionType,
  GetFacebookUserDataPayloadType,
  GetGoogleUserDataSagaActionType,
  GetGoogleUserDataPayloadType,
  GoogleSignOutSagaActionType,
} from '@store/actions/signInSagaActions/types';

export const getGoogleUserData = (
  payload: GetGoogleUserDataPayloadType,
): GetGoogleUserDataSagaActionType => ({
  type: SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA,
  payload,
});

export const GoogleSignOut = (): GoogleSignOutSagaActionType => ({
  type: SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA,
});

export const getFacebookUserData = (
  payload: GetFacebookUserDataPayloadType,
): GetFacebookUserDataSagaActionType => ({
  type: SIGN_IN_SAGA_ACTIONS.GET_FACEBOOK_USER_DATA_SAGA,
  payload,
});

export const FacebookSignOut = (): FacebookSignOutSagaActionType => ({
  type: SIGN_IN_SAGA_ACTIONS.FACEBOOK_SIGN_OUT_SAGA,
});
