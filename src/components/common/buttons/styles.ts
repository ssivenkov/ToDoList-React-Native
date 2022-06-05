import {COLORS} from '@colors/colors';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CustomButtonStylesType = {
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<CustomButtonStylesType>({
    textButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: props.TEXT_BUTTON_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
    },

    textButtonDisable: {
      opacity: 0.3,
    },

    text: {
      fontSize: 20,
      color: COLORS.WHITE,
    },

    icon: {
      marginHorizontal: 4,
    },
  });
