import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Nullable} from '@root/types/common/types';

export type SnapshotType = FirebaseDatabaseTypes.DataSnapshot;
export type UserDataType = Nullable<FirebaseAuthTypes.User>;
export type UserIDType = Nullable<FirebaseAuthTypes.User['uid']>;
export type ChannelIDType = string;
export type LanguageType = string;

export type UserReducerStateType = {
  userData: UserDataType;
  channelID: ChannelIDType;
  language: LanguageType;
};