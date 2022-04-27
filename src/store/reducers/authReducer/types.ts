import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Nullable} from '@root/types/common/types';

export type UserDataType = Nullable<FirebaseAuthTypes.User>;

export type InitialAuthStateType = {
  authStatus: boolean;
  userData: UserDataType;
  channelID: string;
};
