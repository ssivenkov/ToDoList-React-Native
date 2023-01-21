import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type NotificationStylesType = {
  notificationContainer: ViewStyle;
  datePickerContainer: ViewStyle;
  switcherContainer: ViewStyle;
  text: TextStyle;
};

export const notificationStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotificationStylesType>({
    notificationContainer: {
      overflow: 'hidden',
    },

    datePickerContainer: {
      alignItems: 'center',
    },

    switcherContainer: {
      marginTop: 23,
    },

    text: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
