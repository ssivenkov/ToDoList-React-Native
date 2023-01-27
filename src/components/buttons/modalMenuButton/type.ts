import { StyleProp, TextStyle } from 'react-native';

export type ModalMenuButtonPropsType = {
  leftRounding: boolean;
  onPress: () => void;
  rightRounding: boolean;
  title: string;

  disabled?: boolean;
  okTextStyle?: StyleProp<TextStyle>;
};
