import React, {FC} from 'react';
import {styles} from './Styles';
import {Task} from '../task/Task';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskListPropsType} from './Types';
import {CreateTaskButton} from '../../screens/tasksScreen/Buttons/CreateTaskButton/CreateTaskButton';
import {EditTaskListTitleButton} from '../../screens/tasksScreen/Buttons/EditTaskListTitleButton/EditTaskListTitleButton';
import {DeleteTaskListButton} from '../../screens/tasksScreen/Buttons/DeleteTaskListButton/DeleteTaskListButton';
import {TaskType} from '../../../store/reducers/taskListReducer/Types';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {id, title, tasks, todo} = props;

  const renderTodoTaskItem: ListRenderItem<TaskType> = ({
    item,
  }): ReturnComponentType => {
    return <Task todo title={item.title} taskListId={id} taskId={item.id} />;
  };
  const renderDoneTaskItem: ListRenderItem<TaskType> = ({
    item,
  }): ReturnComponentType => {
    return <Task title={item.title} taskListId={id} taskId={item.id} />;
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
              tasksList={tasks}
            />
          )}
          <EditTaskListTitleButton oldTitle={title} id={id} tasks={tasks} />
          <DeleteTaskListButton id={id} titleToBeDeletedTaskList={title} />
        </View>
      </View>
      {tasks && tasksList}
    </View>
  );
};
