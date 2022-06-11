import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type DarkModeButtonStylesType = {
  buttonsContainer: ViewStyle;
  buttonContainer: ViewStyle;
  languageIndicatorText: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DarkModeButtonStylesType>({
    buttonsContainer: {
      flexDirection: 'row',
    },

    buttonContainer: {
      margin: 15,
    },

    languageIndicatorText: {
      fontSize: 20,
      textTransform: 'uppercase',
      color: props.TEXT_COLOR,
    },
  });
