import {CreateTaskButton} from '@components/buttons/createTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '@components/buttons/deleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '@components/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '@components/common/task/Task';
import {sortingTasks} from '@components/screens/tasksScreen/helpers/sorting';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskListPropsType} from './types';

export const TaskList = (props: TaskListPropsType) => {
  const {isTodoTaskList, id, date, title, tasks = [], fullTaskList} = props;
  const sortedTasks = sortingTasks(tasks);
  const tasksArr =
    sortedTasks.length > 0 &&
    sortedTasks.map((task) => (
      <Task
        key={task.id}
        isTodo={isTodoTaskList}
        taskListId={id}
        taskTitle={task.title}
        taskId={task.id}
        fullTaskList={fullTaskList}
      />
    ));

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonsContainer}>
          {isTodoTaskList && (
            <CreateTaskButton
              taskListId={id}
              taskListDate={date}
              taskListTitle={title}
              fullTaskList={fullTaskList}
            />
          )}
          <EditTaskListTitleButton oldTaskListTitle={title} taskListId={id} />
          <DeleteTaskListButton
            taskListTitle={title}
            isTodoTaskList={isTodoTaskList}
            fullTaskList={fullTaskList}
          />
        </View>
      </View>
      {tasksArr && tasksArr.length > 0 && (
        <View style={styles.tasksContainer}>{tasksArr}</View>
      )}
    </View>
  );
};
