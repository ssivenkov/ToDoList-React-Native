import {TaskList} from '@components/common/taskList/TaskList';
import {TodoTasksScreenPropsType} from '@components/screens/tasksScreen/types';
import {getTaskList} from '@store/selectors/taskListSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const TasksScreen = (props: TodoTasksScreenPropsType) => {
  const {isTodoScreen} = props;
  const {t} = useTranslation();
  const taskLists = useSelector(getTaskList);

  const toDoTaskLists = taskLists.filter((taskList) => {
    if (
      taskList.showInToDo ||
      (taskList.tasks && taskList.tasks.some((task) => !task.isDone))
    ) {
      return taskList;
    }
  });

  const doneTaskLists = taskLists.filter((taskList) => {
    if (taskList.tasks) {
      return taskList.tasks.some((task) => task.isDone);
    }
  });

  if (isTodoScreen && taskLists && toDoTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {toDoTaskLists.map((toDoTaskList) => (
          <TaskList
            key={toDoTaskList.id}
            isTodoTaskList={true}
            taskListId={toDoTaskList.id}
            taskListTitle={toDoTaskList.title}
            taskListPropsTasks={
              toDoTaskList.tasks &&
              toDoTaskList.tasks.filter((task) => !task.isDone)
            }
            fullTaskList={toDoTaskList}
          />
        ))}
      </ScrollView>
    );
  }

  if (!isTodoScreen && taskLists && doneTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {doneTaskLists.map((doneTaskList) => (
          <TaskList
            key={doneTaskList.id}
            isTodoTaskList={false}
            taskListId={doneTaskList.id}
            taskListTitle={doneTaskList.title}
            taskListPropsTasks={
              doneTaskList.tasks &&
              doneTaskList.tasks.filter((task) => task.isDone)
            }
            fullTaskList={doneTaskList}
          />
        ))}
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