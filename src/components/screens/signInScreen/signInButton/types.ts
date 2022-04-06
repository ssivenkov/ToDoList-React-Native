import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {StyleProp, ViewStyle} from 'react-native';

export type SignInButtonPropsType = {
  buttonColorStyle: StyleProp<ViewStyle>;
  serviceTitle: string;
  icon: IconDefinition;
  onPress: () => void;
  disabled: boolean;
};
