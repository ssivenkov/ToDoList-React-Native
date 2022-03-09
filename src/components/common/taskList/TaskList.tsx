import React, {FC} from 'react';
import {styles} from './Styles';
import {Task} from '../task/Task';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskListPropsType} from './Types';
import {CustomTextButton} from '../buttons/CustomTextButton';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {title, tasks, todo} = props;
  const renderTodoTaskItem: ListRenderItem<string> = ({
    item,
  }): ReturnComponentType => {
    return <Task todo title={item} />;
  };
  const renderDoneTaskItem: ListRenderItem<string> = ({
    item,
  }): ReturnComponentType => {
    return <Task title={item} />;
  };
  let tasksList;
  if (todo) {
    tasksList = <FlatList data={tasks} renderItem={renderTodoTaskItem} />;
  } else {
    tasksList = <FlatList data={tasks} renderItem={renderDoneTaskItem} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{title}</Text>
        {todo && <CustomTextButton title={'Add task'} />}
      </View>
      {tasksList}
    </View>
  );
};
