import {CreateTaskButton} from '@components/buttons/createTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '@components/buttons/deleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '@components/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '@components/common/task/Task';
import {sortingTasks} from '@components/screens/tasksScreen/sorting';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskListPropsType} from './types';

export const TaskList: FC<TaskListPropsType> = (props) => {
  const {
    isTodoTaskList,
    taskListId,
    taskListDate,
    taskListTitle,
    taskListPropsTasks,
    fullTaskList,
  } = props;

  let sortedTasks;
  if (taskListPropsTasks) {
    sortedTasks = taskListPropsTasks.map((item) => item);
  }
  if (sortedTasks) {
    sortedTasks = sortingTasks(sortedTasks);
  }

  const tasks =
    sortedTasks &&
    sortedTasks.map((task) => (
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
              taskListDate={taskListDate}
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
      {tasks && <View style={styles.tasksContainer}>{tasks}</View>}
    </View>
  );
};
