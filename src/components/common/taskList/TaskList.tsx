import React, {FC} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskType} from '../../../store/reducers/taskListReducer/Types';
import {CreateTaskButton} from '../../screens/tasksScreen/Buttons/CreateTaskButton/CreateTaskButton';
import {DeleteTaskListButton} from '../../screens/tasksScreen/Buttons/DeleteTaskListButton/DeleteTaskListButton';
import {EditTaskListTitleButton} from '../../screens/tasksScreen/Buttons/EditTaskListTitleButton/EditTaskListTitleButton';
import {Task} from '../task/Task';
import {styles} from './Styles';
import {TaskListPropsType} from './Types';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {id, title, tasks, todo} = props;

  const renderTodoTaskItem: ListRenderItem<TaskType> = ({
    item,
  }): ReturnComponentType => {
    return (
      <Task
        todo
        taskListId={id}
        taskListTasks={tasks}
        taskTitle={item.title}
        taskId={item.id}
      />
    );
  };
  const renderDoneTaskItem: ListRenderItem<TaskType> = ({
    item,
  }): ReturnComponentType => {
    return (
      <Task
        taskListId={id}
        taskListTasks={tasks}
        taskTitle={item.title}
        taskId={item.id}
      />
    );
  };
  let tasksList;
  if (todo && tasks) {
    tasksList = <FlatList data={tasks} renderItem={renderTodoTaskItem} />;
  } else if (tasks) {
    tasksList = <FlatList data={tasks} renderItem={renderDoneTaskItem} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonsContainer}>
          {todo && (
            <CreateTaskButton
              taskListId={id}
              taskListTitle={title}
              tasks={tasks}
            />
          )}
          <EditTaskListTitleButton oldTaskListTitle={title} taskListId={id} />
          <DeleteTaskListButton id={id} titleToBeDeletedTaskList={title} />
        </View>
      </View>
      {tasks && tasksList}
    </View>
  );
};
