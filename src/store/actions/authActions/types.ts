import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Nullable} from '@root/types/common/types';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

export type SetChannelIDActionType = {
  type: string;
  channelID: string;
};

export type SetAuthStatusActionType = {
  type: string;
  authStatus: boolean;
};

export type SetUserDataActionType = {
  type: string;
  userData: Nullable<FirebaseAuthTypes.User>;
};

export type SetAuthStateActionType = {
  type: string;
  authState: InitialAuthStateType;
};

export type AuthActionsType = SetChannelIDActionType &
  SetAuthStatusActionType &
  SetUserDataActionType &
  SetAuthStateActionType;
