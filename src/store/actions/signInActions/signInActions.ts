import {SIGN_IN_ACTIONS} from 'enums/signInEnum';
import {SetSignInActionsType} from 'store/actions/signInActions/type';

export const setTasks = (signIn: Array<any>): SetSignInActionsType => ({
  type: SIGN_IN_ACTIONS.SET_SIGN_IN,
  signIn: signIn,
});
