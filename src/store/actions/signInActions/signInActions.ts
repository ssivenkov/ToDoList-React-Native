import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {SetAuthStatusActionType} from '@store/actions/signInActions/types';

export const setAuthStatus = (
  authStatus: boolean,
): SetAuthStatusActionType => ({
  type: SIGN_IN_ACTIONS.SET_AUTH_STATUS,
  authStatus,
});
