import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type LongButtonStylesType = {
  longButtonContainer: ViewStyle;
  contentContainer: ViewStyle;
  icon: ViewStyle;
  stringIcon: TextStyle;
  text: TextStyle;
};

const textMarginBottom = 1.5;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<LongButtonStylesType>({
    longButtonContainer: {
      width: props.appWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      paddingRight: 15,
    },

    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    icon: {
      marginLeft: 15,
    },

    stringIcon: {
      fontSize: 24,
      color: props.TEXT_COLOR,
      marginBottom: 1,
    },

    text: {
      fontSize: 18,
      color: props.TEXT_COLOR,
      marginLeft: 20,
      marginBottom: Platform.OS === 'ios' ? 0 : textMarginBottom,
    },
  });
