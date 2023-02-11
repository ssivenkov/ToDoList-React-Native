import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

type SelectAccentColorButtonStylesType = {
  colorIndicator: ViewStyle;
  colorPickerWrapper: ViewStyle;
};

export const selectAccentColorButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SelectAccentColorButtonStylesType>({
    colorIndicator: {
      backgroundColor: props.ACCENT_COLOR,
      borderRadius: 100,
      height: 25,
      width: 25,
    },

    colorPickerWrapper: {
      alignItems: 'center',
      height: 220,
      marginBottom: 20,
      marginLeft: 5,
      marginTop: 5,
    },
  });
