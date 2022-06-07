import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CustomLongButtonStylesType = {
  longButtonContainer: ViewStyle;
  contentContainer: ViewStyle;
  icon: ViewStyle;
  text: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<CustomLongButtonStylesType>({
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
    },

    icon: {
      marginLeft: 15,
    },

    text: {
      fontSize: 18,
      color: props.TEXT_COLOR,
      marginLeft: 20,
      marginBottom: 2,
    },
  });
