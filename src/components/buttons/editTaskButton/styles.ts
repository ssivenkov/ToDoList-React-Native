import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type EditTaskButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  notificationContainer: ViewStyle;
  text: TextStyle;
  icon: FontAwesomeIconStyle;
  dateTimePickerContainer: ViewStyle;
};

const {RED} = COLORS;

export const styles = (props: ThemeType) =>
  StyleSheet.create<EditTaskButtonStylesType>({
    warnText: {
      marginBottom: 15,
      fontSize: 20,
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

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
