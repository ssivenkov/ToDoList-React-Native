import {ViewStyle} from 'react-native';

export type CustomTextButtonPropsType = {
  title: string;
  onPress: () => void;

  touched?: Array<boolean>;
  containerStyle?: ViewStyle;
  errors?: Array<string | undefined>;
  disable?: boolean;
};

export type IconButtonPropsType = {
  icon: JSX.Element;

  onPress?: () => void;
  disable?: boolean;
};
