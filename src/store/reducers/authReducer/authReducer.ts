import {SIGN_IN_ACTIONS} from '@enums/signInEnum';
import {AuthActionsType} from '@store/actions/signInActions/types';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

const initialAuthState = {
  authStatus: false,
};

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthActionsType,
) => {
  switch (action.type) {
    case SIGN_IN_ACTIONS.SET_AUTH_STATUS:
      return {...state, authStatus: action.authStatus};
    default:
      return state;
  }
};
