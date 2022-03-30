import {TaskList} from '@components/common/taskList/TaskList';
import {TaskListType} from '@store/reducers/taskListReducer/types';
import {getTaskList} from '@store/selectors/taskListSelectors';
import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItem,
  LogBox,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const DoneTasksScreen = () => {
  const taskLists = useSelector(getTaskList);
  const doneTaskLists = taskLists.filter((taskList) => {
    if (taskList.tasks) {
      return taskList.tasks.some((task) => task.isDone);
    }
  });

  const doneTaskListRenderItem: ListRenderItem<TaskListType> = ({item}) => {
    const doneTasks = item.tasks && item.tasks.filter((task) => task.isDone);
    return (
      <TaskList
        isTodoTaskList={false}
        taskListId={item.id}
        taskListTitle={item.title}
        taskListPropsTasks={doneTasks}
        fullTaskList={item}
      />
    );
  };

  // hide error
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (doneTaskLists.length > 0) {
    // FlatList must be in ScrollView because this fixes input interaction bug in modal windows
    return (
      <ScrollView>
        <FlatList
          data={doneTaskLists}
          renderItem={doneTaskListRenderItem}
          keyExtractor={(item) => item.id}
          style={styles.tasksListContainer}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>Done task lists is not found</Text>
    </View>
  );
};
