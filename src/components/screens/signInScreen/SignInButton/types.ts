import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {StyleProp, ViewStyle} from 'react-native';

export type SignInButtonPropsType = {
  buttonColorStyle: StyleProp<ViewStyle>;
  serviceTitle: string;
  icon: IconDefinition;
  onPress: () => void;
  disabled: boolean;
};

type UserDataType = {
  displayName: string | null;
  photoURL: string | null;
};

export type UserScreenPropsType = {
  userData: UserDataType;
  signOutCallback: () => void;
};
