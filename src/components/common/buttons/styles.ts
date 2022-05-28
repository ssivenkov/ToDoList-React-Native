import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
};

const {WHITE} = COLORS;

export const styles = (props: ThemeType) =>
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
      color: WHITE,
    },

    icon: {
      marginHorizontal: 4,
    },
  });
