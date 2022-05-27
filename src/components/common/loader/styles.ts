import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  loaderContainer: ViewStyle;
};

export const styles = (props: ThemeType) =>
  StyleSheet.create<TasksScreenStylesType>({
    loaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      backgroundColor: props.BACKGROUND_COLOR,
    },
  });
