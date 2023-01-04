import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DarkModeButtonStylesType = {
  text: TextStyle;
};

export const darkModeButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DarkModeButtonStylesType>({
    text: {
      fontSize: 18,
      color: props.TEXT_COLOR,
    },
  });
