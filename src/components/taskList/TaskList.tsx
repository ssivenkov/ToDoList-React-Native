import React from 'react';

import { Task } from '@components/task/Task';
import { sortingTasks } from '@helpers/sorting';
import { useStyles } from '@hooks/useStyles';
import { CollapsingButton } from '@screens/tasksScreen/buttons/collapsingButton/CollapsingButton';
import { CreateTaskButton } from '@screens/tasksScreen/buttons/createTaskButton/CreateTaskButton';
import { DeleteTaskListButton } from '@screens/tasksScreen/buttons/deleteTaskListButton/DeleteTaskListButton';
import { EditTaskListTitleButton } from '@screens/tasksScreen/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import { Text, View } from 'react-native';

import { taskListStyles } from './styles';
import { TaskListPropsType } from './types';

export const TaskList = (props: TaskListPropsType) => {
  const {
    isTodoTaskList,
    taskListID,
    taskListDate,
    taskListTitle,
    taskListTasks = [],
    isTodoCollapsed,
    isDoneCollapsed,
    fullTaskList,
  } = props;

  const styles = useStyles(taskListStyles);

  const sortedTasks = sortingTasks(taskListTasks);

  const tasksCondition =
    (sortedTasks.length > 0 && isTodoTaskList && !isTodoCollapsed) ||
    (sortedTasks.length > 0 && !isTodoTaskList && !isDoneCollapsed);

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <CollapsingButton
          isDoneCollapsed={isDoneCollapsed}
          isTodoCollapsed={isTodoCollapsed}
          isTodoTaskList={isTodoTaskList}
          taskListID={taskListID}
          taskListsCount={sortedTasks.length}
        />
        <Text style={styles.title}>{taskListTitle}</Text>
        <View style={styles.buttonsContainer}>
          {isTodoTaskList && (
            <CreateTaskButton
              fullTaskList={fullTaskList}
              taskListDate={taskListDate}
              taskListID={taskListID}
              taskListTitle={taskListTitle}
            />
          )}
          <EditTaskListTitleButton
            oldTaskListTitle={taskListTitle}
            taskListID={taskListID}
          />
          <DeleteTaskListButton
            fullTaskList={fullTaskList}
            isTodoTaskList={isTodoTaskList}
            taskListTitle={taskListTitle}
          />
        </View>
      </View>
      {tasksCondition && (
        <View style={styles.tasksContainer}>
          {sortedTasks.map((task) => {
            const { id: taskID, title: taskTitle, colorMark } = task;

            return (
              <Task
                colorMark={colorMark}
                fullTaskList={fullTaskList}
                isTodo={isTodoTaskList}
                key={taskID}
                taskID={taskID}
                taskListID={taskListID}
                taskTitle={taskTitle}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
