import {COLORS} from '@colors/colors';
import {StyleSheet, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  loaderContainer: ViewStyle;
};

const {WHITE} = COLORS;

export const styles = StyleSheet.create<TasksScreenStylesType>({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    zIndex: 1,
  },
});
