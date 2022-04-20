import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

export type SetAuthStatusActionType = {
  type: string;
  authStatus: boolean;
};

export type SetUserDataActionType = {
  type: string;
  userData: FirebaseAuthTypes.User | null;
};

export type SetAuthStateActionType = {
  type: string;
  authState: InitialAuthStateType;
};

export type AuthActionsType = SetAuthStatusActionType &
  SetUserDataActionType &
  SetAuthStateActionType;
