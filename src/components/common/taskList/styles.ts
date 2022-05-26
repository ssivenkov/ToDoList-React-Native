import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';
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
const {RED} = COLORS;

export const styles = (props?: ThemeType) =>
  StyleSheet.create<TaskListStylesType>({
    container: {
      backgroundColor: props?.TASK_LIST_COLOR,
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
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      flex: 1,
      color: props?.TEXT_COLOR,
      fontSize: 22,
    },

    warnText: {
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
