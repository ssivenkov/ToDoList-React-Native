import {CreateTaskButton} from '@components/buttons/createTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '@components/buttons/deleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '@components/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '@components/common/task/Task';
import {sortingTasks} from '@root/helpers/sorting';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskListPropsType} from './types';

export const TaskList = (props: TaskListPropsType) => {
  const {
    isTodoTaskList,
    taskListID,
    taskListDate,
    taskListTitle,
    taskListTasks = [],
    fullTaskList,
  } = props;

  const sortedTasks = sortingTasks(taskListTasks);

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{taskListTitle}</Text>
        <View style={styles.buttonsContainer}>
          {isTodoTaskList && (
            <CreateTaskButton
              taskListID={taskListID}
              taskListDate={taskListDate}
              taskListTitle={taskListTitle}
              fullTaskList={fullTaskList}
            />
          )}
          <EditTaskListTitleButton
            oldTaskListTitle={taskListTitle}
            taskListID={taskListID}
          />
          <DeleteTaskListButton
            taskListTitle={taskListTitle}
            isTodoTaskList={isTodoTaskList}
            fullTaskList={fullTaskList}
          />
        </View>
      </View>
      {sortedTasks.length > 0 && (
        <View style={styles.tasksContainer}>
          {sortedTasks.map((task) => {
            const {id: taskID, title: taskTitle} = task;

            return (
              <Task
                key={taskID}
                isTodo={isTodoTaskList}
                taskListID={taskListID}
                taskTitle={taskTitle}
                taskID={taskID}
                fullTaskList={fullTaskList}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
