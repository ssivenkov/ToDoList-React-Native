import { TextStyle, ViewStyle } from 'react-native';

type isOnType = boolean;

export type SwitcherPropsType = {
  isOn: isOnType;
  size: 'large' | 'medium' | 'small';

  switcherText?: string;
  onToggleSwitcherClick?: (isOn: isOnType) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  textMargin?: number;
};
