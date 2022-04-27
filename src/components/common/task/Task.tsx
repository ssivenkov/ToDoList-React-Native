import {DeleteTaskButton} from '@components/buttons/deleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '@components/buttons/doneTaskButton/DoneTaskButton';
import {EditTaskButton} from '@components/buttons/editTaskButton/EditTaskButton';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskPropsType} from './types';

export const Task: FC<TaskPropsType> = (props) => {
  const {isTodo, taskListId, taskTitle, taskId, fullTaskList} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{taskTitle}</Text>
      <View style={styles.buttonsContainer}>
        {isTodo && (
          <DoneTaskButton
            completedTaskTitle={taskTitle}
            taskListId={taskListId}
            doneTaskId={taskId}
          />
        )}
        <EditTaskButton
          taskListId={taskListId}
          taskId={taskId}
          oldTaskTitle={taskTitle}
          isTodo={isTodo}
        />
        <DeleteTaskButton
          isTodoTaskList={isTodo}
          taskId={taskId}
          taskTitle={taskTitle}
          fullTaskList={fullTaskList}
        />
      </View>
    </View>
  );
};
