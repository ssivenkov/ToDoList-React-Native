import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {SetSignInStatusActionType} from '@store/actions/signInActions/types';

export const setSignInStatus = (
  signInStatus: string,
): SetSignInStatusActionType => ({
  type: SIGN_IN_ACTIONS.SET_SIGN_IN_STATUS,
  signInStatus,
});
