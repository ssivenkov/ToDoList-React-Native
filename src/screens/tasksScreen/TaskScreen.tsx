import React from 'react';

import { TaskList } from '@components/taskList/TaskList';
import { sortingTaskLists } from '@helpers/sorting';
import { useStyles } from '@hooks/useStyles';
import { useRoute } from '@react-navigation/native';
import { taskListsSelector } from '@store/selectors/tasksSelectors';
import { globalLoaderSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { taskScreenStyles } from './styles';
import { TaskScreenRouteType } from './types';

export const TasksScreen = () => {
  const styles = useStyles(taskScreenStyles);

  const { t } = useTranslation();

  const { isTodoScreen } = useRoute<TaskScreenRouteType>().params;

  const taskLists = useSelector(taskListsSelector);
  const globalLoader = useSelector(globalLoaderSelector);

  const toDoTaskLists = taskLists.filter(({ showInToDo }) => showInToDo);
  const doneTaskLists = taskLists.filter((taskList) => {
    const { tasks } = taskList;

    if (tasks && tasks.length > 0) {
      const hasDoneTasks = taskList.tasks && taskList.tasks.some((task) => task.isDone);

      if (hasDoneTasks) {
        return true;
      }
    }
  });

  const sortedToDoTaskLists = sortingTaskLists(toDoTaskLists);
  const sortedDoneTaskLists = sortingTaskLists(doneTaskLists);

  if (isTodoScreen && sortedToDoTaskLists.length > 0) {
    return (
      <ScrollView>
        <View style={styles.tasksListContainer}>
          {sortedToDoTaskLists.map((item) => {
            const { id, date, title, tasks, isTodoCollapsed, isDoneCollapsed } = item;
            const toDoTasks = tasks && tasks.filter((task) => !task.isDone);

            return (
              <TaskList
                fullTaskList={item}
                isDoneCollapsed={!!isDoneCollapsed}
                isTodoCollapsed={!!isTodoCollapsed}
                isTodoTaskList={true}
                key={id}
                taskListDate={date}
                taskListID={id}
                taskListTasks={toDoTasks}
                taskListTitle={title}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }

  if (!isTodoScreen && sortedDoneTaskLists.length > 0) {
    return (
      <ScrollView>
        <View style={styles.tasksListContainer}>
          {sortedDoneTaskLists.map((item) => {
            const { id, date, title, tasks, isTodoCollapsed, isDoneCollapsed } = item;
            const doneTasks = tasks && tasks.filter((task) => task.isDone);

            return (
              <TaskList
                fullTaskList={item}
                isDoneCollapsed={!!isDoneCollapsed}
                isTodoCollapsed={!!isTodoCollapsed}
                isTodoTaskList={false}
                key={id}
                taskListDate={date}
                taskListID={id}
                taskListTasks={doneTasks}
                taskListTitle={title}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }

  if (globalLoader) {
    return null;
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>{t('tasksScreen.NoTaskListsFound')}</Text>
    </View>
  );
};
