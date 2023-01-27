import { ViewStyle } from 'react-native';

export type TextButtonPropsType = {
  onPress: () => void;
  title: string;

  containerStyle?: ViewStyle;
  disabled?: boolean;
  errors?: Array<string | undefined>;
  touched?: boolean[];
};
