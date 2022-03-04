import React, {FC} from 'react';
import {styles} from './Styles';
import {Task} from '../task/Task';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskItemType} from 'store/reducers/tasksReducer/Types';
import {TaskListPropsType} from './Types';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {dataList, title, todo, done} = props;
  const renderTodoTaskItem: ListRenderItem<TaskItemType> = ({item}) => {
    return <Task title={item.key} todo />;
  };
  const renderDoneTaskItem: ListRenderItem<TaskItemType> = ({item}) => {
    return <Task title={item.key} />;
  };
  let jsx;
  if (todo) {
    jsx = <FlatList data={dataList} renderItem={renderTodoTaskItem} />;
  } else if (done) {
    jsx = <FlatList data={dataList} renderItem={renderDoneTaskItem} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {jsx}
    </View>
  );
};
