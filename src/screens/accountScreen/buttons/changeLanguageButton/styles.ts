import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ChangeLanguageButtonStylesType = {
  buttonContainer: ViewStyle;
  languageIndicator: TextStyle;
};

export const changeLanguageButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ChangeLanguageButtonStylesType>({
    buttonContainer: {
      margin: 8,
    },

    languageIndicator: {
      color: props.TEXT_COLOR,
      fontSize: 20,
      textTransform: 'uppercase',
    },
  });
