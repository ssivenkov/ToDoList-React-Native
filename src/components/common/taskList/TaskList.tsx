import React from 'react';

import { CollapsingButton } from '@components/buttons/collapsingButton/CollapsingButton';
import { CreateTaskButton } from '@components/buttons/createTaskButton/CreateTaskButton';
import { DeleteTaskListButton } from '@components/buttons/deleteTaskListButton/DeleteTaskListButton';
import { EditTaskListTitleButton } from '@components/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import { Task } from '@components/common/task/Task';
import { sortingTasks } from '@root/helpers/sorting';
import { useStyles } from '@root/hooks/useStyles';
import { Text, View } from 'react-native';

import { styles } from './styles';
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

  const style = useStyles(styles);

  const sortedTasks = sortingTasks(taskListTasks);

  const tasksCondition =
    (sortedTasks.length > 0 && isTodoTaskList && !isTodoCollapsed) ||
    (sortedTasks.length > 0 && !isTodoTaskList && !isDoneCollapsed);

  return (
    <View style={style.container}>
      <View style={style.controlsContainer}>
        <CollapsingButton
          isDoneCollapsed={isDoneCollapsed}
          isTodoCollapsed={isTodoCollapsed}
          isTodoTaskList={isTodoTaskList}
          taskListID={taskListID}
          taskListsCount={sortedTasks.length}
        />
        <Text style={style.title}>{taskListTitle}</Text>
        <View style={style.buttonsContainer}>
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
        <View style={style.tasksContainer}>
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
