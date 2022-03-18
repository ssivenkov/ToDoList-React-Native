import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {DeleteTaskButton} from '../../buttons/deleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '../../buttons/doneTaskButton/DoneTaskButton';
import {EditTaskTitleButton} from '../../buttons/editTaskTitleButton/EditTaskTitleButton';
import {styles} from './styles';
import {TaskPropsType} from './types';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
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
        <EditTaskTitleButton
          taskListId={taskListId}
          taskId={taskId}
          oldTaskTitle={taskTitle}
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
