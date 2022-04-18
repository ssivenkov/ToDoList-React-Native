import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskListStylesType = {
  container: ViewStyle;
  title: TextStyle;
  controlsContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  tasksContainer: ViewStyle;
};

export const TaskListMarginVertical = 8;
const {ALTO, TUNDORA, BLACK, RED} = COLORS;

export const styles = StyleSheet.create<TaskListStylesType>({
  container: {
    backgroundColor: ALTO,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: TaskListMarginVertical,
    borderRadius: 10,
  },

  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  title: {
    flex: 1,
    color: TUNDORA,
    fontSize: 22,
  },

  warnText: {
    color: BLACK,
    fontSize: 20,
  },

  redHighlightTask: {
    color: RED,
    fontWeight: '500',
  },

  tasksContainer: {
    marginTop: TaskListMarginVertical,
  },
});
