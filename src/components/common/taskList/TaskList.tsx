import {CreateTaskButton} from '@components/buttons/createTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '@components/buttons/deleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '@components/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '@components/common/task/Task';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskListPropsType} from './types';

export const TaskList: FC<TaskListPropsType> = (props) => {
  const {
    isTodoTaskList,
    taskListId,
    taskListTitle,
    taskListPropsTasks,
    fullTaskList,
  } = props;

  const tasks = taskListPropsTasks.map((task) => (
    <Task
      key={task.id}
      isTodo={isTodoTaskList}
      taskListId={taskListId}
      taskTitle={task.title}
      taskId={task.id}
      fullTaskList={fullTaskList}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{taskListTitle}</Text>
        <View style={styles.buttonsContainer}>
          {isTodoTaskList && (
            <CreateTaskButton
              taskListId={taskListId}
              taskListTitle={taskListTitle}
              fullTaskList={fullTaskList}
            />
          )}
          <EditTaskListTitleButton
            oldTaskListTitle={taskListTitle}
            taskListId={taskListId}
          />
          <DeleteTaskListButton
            taskListTitle={taskListTitle}
            isTodoTaskList={isTodoTaskList}
            fullTaskList={fullTaskList}
          />
        </View>
      </View>
      {taskListPropsTasks && tasks}
    </View>
  );
};
