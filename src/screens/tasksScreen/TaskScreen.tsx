import {TaskList} from '@components/common/taskList/TaskList';
import {sortingTaskLists} from '@root/helpers/sorting';
import {TasksScreenType} from '@root/screens/tasksScreen/types';
import {taskListsSelector} from '@store/selectors/tasksSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const TasksScreen = (props: TasksScreenType) => {
  const {isTodoScreen} = props;

  const {t} = useTranslation();

  const taskLists = useSelector(taskListsSelector);
  const toDoTaskLists = taskLists.filter(({showInToDo}) => showInToDo);
  const doneTaskLists = taskLists.filter((taskList) => {
    const {tasks} = taskList;

    if (tasks && tasks.length > 0) {
      const hasDoneTasks =
        taskList.tasks && taskList.tasks.some((task) => task.isDone);

      if (hasDoneTasks) return true;
    }
  });
  const sortedToDoTaskLists = sortingTaskLists(toDoTaskLists);
  const sortedDoneTaskLists = sortingTaskLists(doneTaskLists);

  if (isTodoScreen && sortedToDoTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {sortedToDoTaskLists.map((toDoTaskList) => {
          const {id, date, title, tasks} = toDoTaskList;
          const toDoTasks = tasks && tasks.filter((task) => !task.isDone);

          return (
            <TaskList
              key={id}
              isTodoTaskList={true}
              taskListID={id}
              taskListDate={date}
              taskListTitle={title}
              taskListTasks={toDoTasks}
              fullTaskList={toDoTaskList}
            />
          );
        })}
      </ScrollView>
    );
  }

  if (!isTodoScreen && sortedDoneTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {sortedDoneTaskLists.map((doneTaskList) => {
          const {id, date, title, tasks} = doneTaskList;
          const doneTasks = tasks && tasks.filter((task) => task.isDone);

          return (
            <TaskList
              key={id}
              isTodoTaskList={false}
              taskListID={id}
              taskListDate={date}
              taskListTitle={title}
              taskListTasks={doneTasks}
              fullTaskList={doneTaskList}
            />
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>
        {t('tasksScreen.NoTaskListsFound')}
      </Text>
    </View>
  );
};