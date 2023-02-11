import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type NotificationStylesType = {
  datePickerContainer: ViewStyle;
  notificationContainer: ViewStyle;
  switcherContainer: ViewStyle;
  text: TextStyle;
};

export const notificationStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotificationStylesType>({
    datePickerContainer: {
      alignItems: 'center',
    },

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
