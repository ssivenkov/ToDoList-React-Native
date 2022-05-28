import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
};

export const styles = (props: ThemeType) =>
  StyleSheet.create<TasksScreenStylesType>({
    signInWrapper: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
    },

    signInContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    screenTitle: {
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 25,
      color: props.TEXT_COLOR,
    },
  });
