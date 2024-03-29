import React, { useCallback, useEffect, useState } from 'react';

import { TaskList } from '@components/taskList/TaskList';
import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { sortingTaskLists } from '@helpers/sorting';
import { useStyles } from '@hooks/useStyles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { setLastRouteAction } from '@store/actions/userReducerActions/setLastRouteAction';
import { taskListsSelector } from '@store/selectors/tasksSelectors';
import { globalLoaderSelector, lastRouteSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { taskScreenStyles } from './styles';
import { TaskScreenRouteType } from './types';

export const TasksScreen = () => {
  const dispatch = useDispatch();

  const styles = useStyles(taskScreenStyles);

  const { t } = useTranslation();

  const { isTodoScreen } = useRoute<TaskScreenRouteType>().params;

  const lastRoute = useSelector(lastRouteSelector);
  const taskLists = useSelector(taskListsSelector);
  const globalLoader = useSelector(globalLoaderSelector);

  const [rerender, setRerender] = useState<string>('');

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

  useFocusEffect(() => {
    if (lastRoute !== WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR) {
      dispatch(
        setLastRouteAction({ lastRoute: WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR }),
      );
    }
  });

  // for triggering useFocusEffect, when user just open app and press native goBack button
  useEffect(() => {
    setRerender(nanoid());
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();

        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [rerender]),
  );

  if (isTodoScreen && sortedToDoTaskLists.length > 0) {
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.tasksListContainer}>
            {sortedToDoTaskLists.map((item) => {
              const {
                id,
                date,
                title,
                tasks,
                isTodoCollapsed = false,
                isDoneCollapsed = true,
                sorting,
              } = item;

              const toDoTasks = tasks && tasks.filter((task) => !task.isDone);

              return (
                <TaskList
                  fullTaskList={item}
                  isDoneCollapsed={isDoneCollapsed}
                  isTodoCollapsed={isTodoCollapsed}
                  isTodoTaskList={true}
                  key={id}
                  sorting={sorting}
                  taskListDate={date}
                  taskListID={id}
                  taskListTasks={toDoTasks}
                  taskListTitle={title}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (!isTodoScreen && sortedDoneTaskLists.length > 0) {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.tasksListContainer}>
          {sortedDoneTaskLists.map((item) => {
            const {
              id,
              date,
              title,
              tasks,
              isTodoCollapsed = false,
              isDoneCollapsed = true,
              sorting,
            } = item;

            const doneTasks = tasks && tasks.filter((task) => task.isDone);

            return (
              <TaskList
                fullTaskList={item}
                isDoneCollapsed={isDoneCollapsed}
                isTodoCollapsed={isTodoCollapsed}
                isTodoTaskList={false}
                key={id}
                sorting={sorting}
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
