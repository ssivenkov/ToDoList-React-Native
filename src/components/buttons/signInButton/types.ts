import { ReactElement } from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { StyleProp, ViewStyle } from 'react-native';

export type SignInButtonPropsType = {
  colorStyle: StyleProp<ViewStyle>;
  disabled: boolean;
  icon: IconDefinition;
  onPress: () => void;
  text: string | ReactElement;
};
