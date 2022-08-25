import React from 'react';

import { TaskList } from '@components/common/taskList/TaskList';
import { useRoute } from '@react-navigation/native';
import { sortingTaskLists } from '@root/helpers/sorting';
import { useStyles } from '@root/hooks/useStyles';
import { TaskScreenRouteType } from '@root/screens/tasksScreen/types';
import { taskListsSelector } from '@store/selectors/tasksSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './styles';

export const TasksScreen = () => {
  const { t } = useTranslation();
  const style = useStyles(styles);
  const { isTodoScreen } = useRoute<TaskScreenRouteType>().params;

  const taskLists = useSelector(taskListsSelector);
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
        <View style={style.tasksListContainer}>
          {sortedToDoTaskLists.map((item) => {
            const { id, date, title, tasks } = item;
            const toDoTasks = tasks && tasks.filter((task) => !task.isDone);

            return (
              <TaskList
                fullTaskList={item}
                isTodoTaskList
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
        <View style={style.tasksListContainer}>
          {sortedDoneTaskLists.map((item) => {
            const { id, date, title, tasks } = item;
            const doneTasks = tasks && tasks.filter((task) => task.isDone);

            return (
              <TaskList
                fullTaskList={item}
                isTodoTaskList
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

  return (
    <View style={style.nullContentContainer}>
      <Text style={style.nullContentText}>{t('tasksScreen.NoTaskListsFound')}</Text>
    </View>
  );
};
