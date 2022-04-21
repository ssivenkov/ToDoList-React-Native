import {StyleSheet, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  loaderContainer: ViewStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
