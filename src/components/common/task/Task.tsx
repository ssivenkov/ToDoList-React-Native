import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {DeleteTaskButton} from '../../screens/tasksScreen/Buttons/DeleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '../../screens/tasksScreen/Buttons/DoneTaskButton/DoneTaskButton';
import {EditTaskTitleButton} from '../../screens/tasksScreen/Buttons/EditTaskTitleButton/EditTaskTitleButton';
import {styles} from './Styles';
import {TaskPropsType} from './Types';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
  const {isTodo, taskListId, taskListTasks, taskTitle, taskId, taskLists} =
    props;

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
          taskListId={taskListId}
          taskListTasks={taskListTasks}
          taskId={taskId}
          taskTitle={taskTitle}
          taskLists={taskLists}
        />
      </View>
    </View>
  );
};
