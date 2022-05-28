import {TaskListMarginVertical} from '@components/common/taskList/styles';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TodoTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = (props: ThemeType) =>
  StyleSheet.create<TodoTasksScreenStylesType>({
    tasksListContainer: {
      marginVertical: TaskListMarginVertical,
    },

    nullContentContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    nullContentText: {
      fontSize: 22,
      textAlign: 'center',
      color: props.TEXT_COLOR,
    },
  });
