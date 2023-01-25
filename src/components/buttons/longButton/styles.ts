import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type LongButtonStylesType = {
  longButtonContainer: ViewStyle;
  contentContainer: ViewStyle;
  stringIcon: TextStyle;
  text: TextStyle;
  rightComponent: ViewStyle;
};

const textMarginBottom = 1.5;

export const longButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<LongButtonStylesType>({
    longButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      paddingRight: 15,
    },

    contentContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    stringIcon: {
      fontSize: 24,
      color: props.TEXT_COLOR,
      marginBottom: 1,
    },

    text: {
      flex: 1,
      fontSize: 18,
      color: props.TEXT_COLOR,
      marginLeft: 20,
      marginBottom: Platform.OS === 'ios' ? 0 : textMarginBottom,
    },

    rightComponent: {
      paddingLeft: 15,
    },
  });
