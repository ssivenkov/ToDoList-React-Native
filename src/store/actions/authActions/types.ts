import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type SetAuthStatusActionType = {
  type: string;
  authStatus: boolean;
};

export type SetUserDataActionType = {
  type: string;
  userData: FirebaseAuthTypes.User | null;
};

export type AuthActionsType = SetAuthStatusActionType & SetUserDataActionType;
