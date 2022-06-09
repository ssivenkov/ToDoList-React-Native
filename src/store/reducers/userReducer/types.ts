import {
  EN,
  FACEBOOK_PROVIDER_ID,
  GOOGLE_PROVIDER_ID,
  RU,
} from '@constants/constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Nullable} from '@root/types/common/types';

export type SnapshotType = FirebaseDatabaseTypes.DataSnapshot;
export type UserDataType = Nullable<FirebaseAuthTypes.User>;
export type UserIDType = Nullable<FirebaseAuthTypes.User['uid']>;
export type ChannelIDType = string;
export type LanguageType = typeof EN | typeof RU;
export type ProviderIDType = Nullable<
  typeof GOOGLE_PROVIDER_ID | typeof FACEBOOK_PROVIDER_ID
>;
export type UserAvatarType = Nullable<string>;
export type ThemeType = {
  darkMode: boolean;
  BACKGROUND_COLOR: string;
  TASK_LIST_COLOR: string;
  TASK_COLOR: string;
  TEXT_COLOR: string;
  TEXT_BUTTON_COLOR: string;
  TAB_BAR_BACKGROUND_COLOR: string;
  TAB_BAR_ICON_COLOR: string;
  TAB_BAR_TEXT_COLOR: string;
  ICON_BUTTON_COLOR: string;
  PLACEHOLDER_COLOR: string;
};
export type AccentColorType = string;
export type ErrorModalMessageType = string;

export type UserReducerStateType = {
  providerID: ProviderIDType;
  userData: UserDataType;
  channelID: ChannelIDType;
  userAvatar: UserAvatarType;
  language: LanguageType;
  theme: ThemeType;
  accentColor: AccentColorType;
  errorModalMessage: ErrorModalMessageType;
};
