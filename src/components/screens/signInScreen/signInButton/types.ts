import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {StyleProp, ViewStyle} from 'react-native';

export type SignInButtonPropsType = {
  colorStyle: StyleProp<ViewStyle>;
  serviceTitle: string;
  icon: IconDefinition;
  onPress: () => void;
  disabled: boolean;
};
