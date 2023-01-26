import { StyleProp, TextStyle } from 'react-native';

export type ModalMenuButtonPropsType = {
  title: string;
  onPress: () => void;
  leftRounding: boolean;
  rightRounding: boolean;

  disabled?: boolean;
  okTextStyle?: StyleProp<TextStyle>;
};
