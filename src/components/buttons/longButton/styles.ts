import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type LongButtonStylesType = {
  contentContainer: ViewStyle;
  longButtonContainer: ViewStyle;
  rightComponent: ViewStyle;
  stringIcon: TextStyle;
  text: TextStyle;
};

const textMarginBottom = 1.5;

export const longButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<LongButtonStylesType>({
    contentContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },

    longButtonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      paddingRight: 15,
      width: '100%',
    },

    rightComponent: {
      paddingLeft: 15,
    },

    stringIcon: {
      color: props.TEXT_COLOR,
      fontSize: 24,
      marginBottom: 1,
    },

    text: {
      color: props.TEXT_COLOR,
      flex: 1,
      fontSize: 18,
      marginBottom: Platform.OS === 'ios' ? 0 : textMarginBottom,
      marginLeft: 20,
    },
  });
