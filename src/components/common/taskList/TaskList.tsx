import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React, {FC} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {TaskType} from '../../../store/reducers/taskListReducer/types';
import {CreateTaskButton} from '../../buttons/createTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '../../buttons/deleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '../../buttons/editTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '../task/Task';
import {styles} from './styles';
import {TaskListPropsType} from './types';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {
    isTodoTaskList,
    taskListId,
    taskListTitle,
    taskListPropsTasks,
    fullTaskList,
  } = props;

  const renderTaskItem: ListRenderItem<TaskType> = ({
    item,
  }): ReturnComponentType => {
    return (
      <Task
        isTodo={isTodoTaskList}
        taskListId={taskListId}
        taskTitle={item.title}
        taskId={item.id}
        fullTaskList={fullTaskList}
      />
    );
  };

  const tasks = (
    <FlatList data={taskListPropsTasks} renderItem={renderTaskItem} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{taskListTitle}</Text>
        <View style={styles.buttonsContainer}>
          {isTodoTaskList && (
            <CreateTaskButton
              taskListId={taskListId}
              taskListTitle={taskListTitle}
              fullTaskList={fullTaskList}
            />
          )}
          <EditTaskListTitleButton
            oldTaskListTitle={taskListTitle}
            taskListId={taskListId}
          />
          <DeleteTaskListButton
            titleToBeDeletedTaskList={taskListTitle}
            isTodoTaskList={isTodoTaskList}
            fullTaskList={fullTaskList}
          />
        </View>
      </View>
      {taskListPropsTasks && tasks}
    </View>
  );
};
