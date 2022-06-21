import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

type DarkModeButtonStylesType = {
  colorIndicator: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DarkModeButtonStylesType>({
    colorIndicator: {
      width: 25,
      height: 25,
      borderRadius: 100,
      backgroundColor: props.ACCENT_COLOR,
    },
  });
