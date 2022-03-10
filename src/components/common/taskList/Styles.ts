import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskListStylesType = {
  container: ViewStyle;
  title: TextStyle;
  controlsContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
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

  buttonsContainer: {
    flexDirection: 'row',
  },

  title: {
    color: '#444',
    fontSize: 22,
  },

  warnText: {
    color: '#000',
    fontSize: 20,
  },

  redHighlightTask: {
    color: 'red',
    fontWeight: '500',
  },
});
