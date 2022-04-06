import {TaskList} from '@components/common/taskList/TaskList';
import {getTaskList} from '@store/selectors/taskListSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const TodoTasksScreen = () => {
  const {t} = useTranslation();
  const taskLists = useSelector(getTaskList);
  const toDoTaskLists = taskLists.filter((taskList) => {
    if (taskList.showInToDo || taskList.tasks.some((task) => !task.isDone)) {
      return taskList;
    }
  });

  if (toDoTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {toDoTaskLists.map((toDoTaskList) => (
          <TaskList
            key={toDoTaskList.id}
            isTodoTaskList={true}
            taskListId={toDoTaskList.id}
            taskListTitle={toDoTaskList.title}
            taskListPropsTasks={toDoTaskList.tasks.filter(
              (task) => !task.isDone,
            )}
            fullTaskList={toDoTaskList}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>
        {t('tasksScreen.NoToDoTaskLists')}
      </Text>
    </View>
  );
};
