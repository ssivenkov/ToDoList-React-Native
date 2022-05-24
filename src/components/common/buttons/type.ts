import {ViewStyle} from 'react-native';

export type CustomTextButtonPropsType = {
  title: string;
  onPress: () => void;

  touched?: Array<boolean>;
  containerStyle?: ViewStyle;
  errors?: Array<string | undefined>;
  disable?: boolean;
};

export type CustomIconButtonPropsType = {
  icon: JSX.Element;

  onPress?: () => void;
  disable?: boolean;
};
