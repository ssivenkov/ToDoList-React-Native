import {DeleteTaskButton} from '@components/buttons/deleteTaskButton/DeleteTaskButton';
import {DoneTaskButton} from '@components/buttons/doneTaskButton/DoneTaskButton';
import {EditTaskButton} from '@components/buttons/editTaskButton/EditTaskButton';
import {useStyles} from '@root/hooks/useStyles';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {TaskPropsType} from './types';

export const Task = (props: TaskPropsType) => {
  const {isTodo, taskListID, taskTitle, taskID, fullTaskList, colorMark} =
    props;

  const style = useStyles(styles);

  return (
    <View style={style.container}>
      <View
        style={[style.mark, {backgroundColor: colorMark || 'transparent'}]}
      />
      <Text style={style.text}>{taskTitle}</Text>
      <View style={style.buttonsContainer}>
        {isTodo && (
          <DoneTaskButton
            completedTaskTitle={taskTitle}
            taskListID={taskListID}
            doneTaskID={taskID}
          />
        )}
        <EditTaskButton
          taskListID={taskListID}
          taskID={taskID}
          oldTaskTitle={taskTitle}
          colorMark={colorMark}
          isTodo={isTodo}
        />
        <DeleteTaskButton
          isTodoTaskList={isTodo}
          taskID={taskID}
          taskTitle={taskTitle}
          fullTaskList={fullTaskList}
        />
      </View>
    </View>
  );
};
