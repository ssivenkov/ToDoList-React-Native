import {AUTH_ACTIONS} from '@enums/authEnum';
import {AuthActionsType} from '@store/actions/authActions/types';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

export const initialAuthState: InitialAuthStateType = {
  authStatus: false,
  userData: null,
  channelID: '',
};

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthActionsType,
): InitialAuthStateType => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_CHANNEL_ID:
      return {...state, channelID: action.channelID};
    case AUTH_ACTIONS.SET_AUTH_STATUS:
      return {...state, authStatus: action.authStatus};
    case AUTH_ACTIONS.SET_USER_DATA:
      return {...state, userData: action.userData};
    case AUTH_ACTIONS.SET_AUTH_STATE:
      return {...state, ...action.authState};
    default:
      return state;
  }
};
