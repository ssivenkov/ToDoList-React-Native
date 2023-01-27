import { TextStyle, ViewStyle } from 'react-native';

type IsOnType = boolean;

export type SwitcherPropsType = {
  isOn: IsOnType;
  size: 'large' | 'medium' | 'small';

  containerStyle?: ViewStyle;
  onToggleSwitcherClick?: (isOn: IsOnType) => void;
  switcherMarginLeft?: number;
  switcherMarginRight?: number;
  switcherText?: string;
  textMarginBottom?: number;
  textStyle?: TextStyle;
};
