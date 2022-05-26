import {DeleteTaskButton} from '@components/buttons/deleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '@components/buttons/doneTaskButton/DoneTaskButton';
import {EditTaskButton} from '@components/buttons/editTaskButton/EditTaskButton';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {TaskPropsType} from './types';

export const Task = (props: TaskPropsType) => {
  const {isTodo, taskListID, taskTitle, taskID, fullTaskList} = props;

  const theme = useSelector(themeSelector);

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>{taskTitle}</Text>
      <View style={styles().buttonsContainer}>
        {isTodo && (
          <DoneTaskButton
            completedTaskTitle={taskTitle}
            taskListID={taskListID}
            doneTaskID={taskID}
          />
        )}
        <EditTaskButton
          taskListID={taskListID}
          taskID={taskID}
          oldTaskTitle={taskTitle}
          isTodo={isTodo}
        />
        <DeleteTaskButton
          isTodoTaskList={isTodo}
          taskID={taskID}
          taskTitle={taskTitle}
          fullTaskList={fullTaskList}
        />
      </View>
    </View>
  );
};
