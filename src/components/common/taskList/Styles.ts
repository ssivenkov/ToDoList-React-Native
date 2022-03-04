import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskListStylesType = {
  container: ViewStyle;
  title: TextStyle;
};

export const taskListMarginVertical = 8;

export const styles = StyleSheet.create<TaskListStylesType>({
  container: {
    backgroundColor: '#CFCFCF',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: taskListMarginVertical,
    borderRadius: 10,
  },

  title: {
    color: '#444',
    fontSize: 22,
  },
});
