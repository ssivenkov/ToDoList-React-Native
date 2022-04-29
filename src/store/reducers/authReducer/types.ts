import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Nullable} from '@root/types/common/types';

export type UserDataType = Nullable<FirebaseAuthTypes.User>;
export type UserIDType = Nullable<FirebaseAuthTypes.User['uid']>;
export type SnapshotType = FirebaseDatabaseTypes.DataSnapshot;

export type AuthStateType = {
  userData: UserDataType;
  userID: UserIDType;
  channelID: string;
};
