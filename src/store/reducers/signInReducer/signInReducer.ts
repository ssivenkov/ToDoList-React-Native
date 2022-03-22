import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {SignInActionsType} from '@store/actions/signInActions/type';
import {InitialSignInStateType} from '@store/reducers/signInReducer/types';

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
