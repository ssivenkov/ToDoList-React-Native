import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {DeleteTaskButton} from '../../screens/tasksScreen/Buttons/DeleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '../../screens/tasksScreen/Buttons/DoneTaskButton/DoneTaskButton';
import {EditTaskTitleButton} from '../../screens/tasksScreen/Buttons/EditTaskTitleButton/EditTaskTitleButton';
import {styles} from './Styles';
import {TaskPropsType} from './Types';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
  const {todo, taskListId, taskListTasks, taskTitle, taskId} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{taskTitle}</Text>
      <View style={styles.buttonsContainer}>
        {todo && (
          <DoneTaskButton
            completedTaskTitle={taskTitle}
            taskListId={taskListId}
            doneTaskId={taskId}
          />
        )}
        {taskListTasks && (
          <EditTaskTitleButton
            taskListId={taskListId}
            taskId={taskId}
            oldTaskTitle={taskTitle}
          />
        )}
        <DeleteTaskButton
          titleToBeDeletedTask={taskTitle}
          taskListId={taskListId}
          taskId={taskId}
        />
      </View>
    </View>
  );
};
