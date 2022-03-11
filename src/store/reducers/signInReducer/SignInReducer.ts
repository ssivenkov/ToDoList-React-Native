import {SIGN_IN_ACTIONS} from '../../../enums/SignInEnum';
import {SignInActionsType} from 'store/actions/signInActions/Type';
import {InitialSignInStateType} from 'store/reducers/signInReducer/Types';

const initialSignInState = {
  signIn: [],
};

export const signInReducer = (
  state: InitialSignInStateType = initialSignInState,
  action: SignInActionsType,
) => {
  switch (action.type) {
    case SIGN_IN_ACTIONS.SET_SIGN_IN:
      return {...state};
    default:
      return state;
  }
};
