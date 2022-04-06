import {TaskList} from '@components/common/taskList/TaskList';
import {getTaskList} from '@store/selectors/taskListSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const DoneTasksScreen = () => {
  const {t} = useTranslation();
  const taskLists = useSelector(getTaskList);
  const doneTaskLists = taskLists.filter((taskList) => {
    if (taskList.tasks) {
      return taskList.tasks.some((task) => task.isDone);
    }
  });

  if (doneTaskLists.length > 0) {
    return (
      <ScrollView style={styles.tasksListContainer}>
        {doneTaskLists.map((doneTaskList) => (
          <TaskList
            key={doneTaskList.id}
            isTodoTaskList={false}
            taskListId={doneTaskList.id}
            taskListTitle={doneTaskList.title}
            taskListPropsTasks={doneTaskList.tasks.filter(
              (task) => task.isDone,
            )}
            fullTaskList={doneTaskList}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>
        {t('tasksScreen.NoDoneTaskLists')}
      </Text>
    </View>
  );
};
