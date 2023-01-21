import { TextStyle, ViewStyle } from 'react-native';

type IsOnType = boolean;

export type SwitcherPropsType = {
  isOn: IsOnType;
  size: 'large' | 'medium' | 'small';

  switcherText?: string;
  onToggleSwitcherClick?: (isOn: IsOnType) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  textMarginBottom?: number;
};
