import React, {FC} from 'react';
import {styles} from './Styles';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskPropsType} from './Types';
import {DeleteTaskButton} from '../../screens/tasksScreen/Buttons/DeleteTaskButton/DeleteTaskButton';
import {EditTaskTitleButton} from '../../screens/tasksScreen/Buttons/EditTaskTitleButton/EditTaskTitleButton';
import {DoneTaskButton} from '../../screens/tasksScreen/Buttons/DoneTaskButton/DoneTaskButton';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
  const {title, todo} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {todo && <DoneTaskButton completedTaskTitle={title} />}
        <EditTaskTitleButton titleToBeEditedTask={title} />
        <DeleteTaskButton titleToBeDeletedTask={title} />
      </View>
    </View>
  );
};
