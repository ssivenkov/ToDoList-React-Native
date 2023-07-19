import { StyleProp, TextStyle } from 'react-native';

export type ModalMenuButtonPropsType = {
  onPress: () => void;

  title: string;

  disabled?: boolean;
  okTextStyle?: StyleProp<TextStyle>;
};

export type ModalMenuButtonVisualExamplePropsType = Omit<
  ModalMenuButtonPropsType,
  'onPress'
> & {
  textSize: number;
};
