import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DarkModeButtonStylesType = {
  text: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DarkModeButtonStylesType>({
    text: {
      fontSize: 18,
      color: props.TEXT_COLOR,
    },
  });
