import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type NotificationStylesType = {
  notificationContainer: ViewStyle;
  switcherContainer: ViewStyle;
  text: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotificationStylesType>({
    notificationContainer: {
      overflow: 'hidden',
    },

    switcherContainer: {
      marginTop: 23,
    },

    text: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
