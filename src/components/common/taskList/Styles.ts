import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskListStylesType = {
  container: ViewStyle;
  title: TextStyle;
  controlsContainer: ViewStyle;
};

export const taskListMarginVertical = 8;

export const styles = StyleSheet.create<TaskListStylesType>({
  container: {
    backgroundColor: '#CFCFCF',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: taskListMarginVertical,
    borderRadius: 10,
  },

  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },

  title: {
    color: '#444',
    fontSize: 22,
  },
});
