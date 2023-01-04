import { ViewStyle } from 'react-native';

export type TextButtonPropsType = {
  title: string;
  onPress: () => void;

  touched?: boolean[];
  containerStyle?: ViewStyle;
  errors?: Array<string | undefined>;
  disabled?: boolean;
};
