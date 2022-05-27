import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CreateTaskButtonStylesType = {
  notificationContainer: ViewStyle;
  text: TextStyle;
  icon: FontAwesomeIconStyle;
  dateTimePickerContainer: ViewStyle;
};

export const styles = (props: ThemeType) =>
  StyleSheet.create<CreateTaskButtonStylesType>({
    notificationContainer: {
      marginTop: 23,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    text: {
      fontSize: 20,
      marginBottom: 2,
    },

    icon: {
      color: props.TEXT_COLOR,
    },

    dateTimePickerContainer: {
      marginVertical: 10,
    },
  });
