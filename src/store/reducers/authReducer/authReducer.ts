import {AUTH_ACTIONS} from '@enums/authEnum';
import {AuthActionsType} from '@store/actions/authActions/types';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

const initialAuthState = {
  authStatus: false,
  userData: null,
};

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthActionsType,
) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_STATUS:
      return {...state, authStatus: action.authStatus};
    case AUTH_ACTIONS.SET_USER_DATA:
      return {...state, userData: action.userData};
    default:
      return state;
  }
};
