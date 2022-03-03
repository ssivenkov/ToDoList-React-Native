import React, {FC} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {Task} from '../task/Task';
import {TaskItemType} from 'store/reducers/TasksReducer/Types';
import {Styles} from './Styles';

type TaskListPropsType = {
  dataList: TaskItemType[];
  title: string;
};

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {dataList, title} = props;

  const renderTaskItem: ListRenderItem<TaskItemType> = ({item}) => {
    return <Task title={item.key} />;
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
      <FlatList data={dataList} renderItem={renderTaskItem} />
    </View>
  );
};
