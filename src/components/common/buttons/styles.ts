import {COLORS} from '@colors/colors';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CustomButtonStylesType = {
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
  longButtonContainer: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<CustomButtonStylesType>({
    textButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: props.TEXT_BUTTON_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
    },

    textButtonDisable: {
      opacity: 0.3,
    },

    text: {
      fontSize: 18,
      color: COLORS.WHITE,
    },

    icon: {
      marginHorizontal: 4,
    },

    longButtonContainer: {
      flexDirection: 'row',
      width: props.appWidth,
      padding: 5,
      backgroundColor: 'skyblue',
    },
  });
