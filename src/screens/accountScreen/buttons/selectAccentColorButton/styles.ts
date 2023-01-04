import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

type SelectAccentColorButtonStylesType = {
  colorIndicator: ViewStyle;
};

export const selectAccentColorButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SelectAccentColorButtonStylesType>({
    colorIndicator: {
      width: 25,
      height: 25,
      borderRadius: 100,
      backgroundColor: props.ACCENT_COLOR,
    },
  });
