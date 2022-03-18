import React from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskListType} from 'store/reducers/taskListReducer/types';
import {getTaskList} from '../../../../../store/selectors/taskListSelectors';
import {ReturnComponentType} from '../../../../../types/common/returnComponentType';
import {TaskList} from '../../../../common/taskList/TaskList';
import {styles} from './styles';

export const TodoTasksScreen = (): ReturnComponentType => {
  const taskLists = useSelector(getTaskList);
  const toDoTaskLists = taskLists.filter((taskList) => {
    if (taskList.showInToDo || taskList.tasks.some((task) => !task.isDone)) {
      return taskList;
    }
  });

  const toDoTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
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

  return (
    <>
      {toDoTaskLists && toDoTaskLists.length > 0 ? (
        <View style={styles.tasksListContainer}>
          <FlatList data={toDoTaskLists} renderItem={toDoTaskListRenderItem} />
        </View>
      ) : (
        <View style={styles.nullContentContainer}>
          <Text style={styles.nullContentText}>
            Todo task lists is not found
          </Text>
        </View>
      )}
    </>
  );
};
