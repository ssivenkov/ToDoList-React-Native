import { StyleProp, TextStyle } from 'react-native';

export type ModalMenuButtonPropsType = {
  onPress: () => void;

  title: string;

  disabled?: boolean;
  okTextStyle?: StyleProp<TextStyle>;
};
