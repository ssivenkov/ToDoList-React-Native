import React from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskListType} from 'store/reducers/taskListReducer/types';
import {ReturnComponentType} from '../../../commonTypes/returnComponentType';
import {getTaskList} from '../../../store/selectors/taskListSelectors';
import {TaskList} from '../../common/taskList/TaskList';
import {styles} from './styles';

export const DoneTasksScreen = (): ReturnComponentType => {
  const taskLists = useSelector(getTaskList);
  const doneTaskLists = taskLists.filter((taskList) => {
    if (taskList.tasks) {
      return taskList.tasks.some((task) => task.isDone);
    }
  });

  const doneTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
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

  return (
    <>
      {doneTaskLists && doneTaskLists.length > 0 ? (
        <View style={styles.tasksListContainer}>
          <FlatList data={doneTaskLists} renderItem={doneTaskListRenderItem} />
        </View>
      ) : (
        <View style={styles.nullContentContainer}>
          <Text style={styles.nullContentText}>
            Done task lists is not found
          </Text>
        </View>
      )}
    </>
  );
};
