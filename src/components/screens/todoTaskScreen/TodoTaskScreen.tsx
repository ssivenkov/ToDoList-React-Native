import {TaskList} from '@components/common/taskList/TaskList';
import {TaskListType} from '@store/reducers/taskListReducer/types';
import {getTaskList} from '@store/selectors/taskListSelectors';
import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  View,
  ScrollView,
  LogBox,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const TodoTasksScreen = () => {
  const taskLists = useSelector(getTaskList);
  const toDoTaskLists = taskLists.filter((taskList) => {
    if (taskList.showInToDo || taskList.tasks.some((task) => !task.isDone)) {
      return taskList;
    }
  });

  const toDoTaskListRenderItem: ListRenderItem<TaskListType> = ({item}) => {
    const toDoTasks = item.tasks && item.tasks.filter((task) => !task.isDone);
    return (
      <TaskList
        isTodoTaskList={true}
        taskListId={item.id}
        taskListTitle={item.title}
        taskListPropsTasks={toDoTasks}
        fullTaskList={item}
      />
    );
  };

  // hide error
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (toDoTaskLists.length > 0) {
    // FlatList must be in ScrollView because this fixes input interaction bug in modal windows
    return (
      <ScrollView>
        <FlatList
          data={toDoTaskLists}
          renderItem={toDoTaskListRenderItem}
          keyExtractor={(item) => item.id}
          style={styles.tasksListContainer}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.nullContentContainer}>
      <Text style={styles.nullContentText}>Todo task lists is not found</Text>
    </View>
  );
};
