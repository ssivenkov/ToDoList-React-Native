import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {SetSignInStatusActionsType} from '@store/actions/signInActions/type';

export const setSignInStatus = (
  signInStatus: string,
): SetSignInStatusActionsType => ({
  type: SIGN_IN_ACTIONS.SET_SIGN_IN_STATUS,
  signInStatus,
});
