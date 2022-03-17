import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {
  deleteTask,
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '../../../../../store/actions/tasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/returnComponentType';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {styles} from './styles';
import {DeleteTaskButtonPropsType} from './types';

export const DeleteTaskButton = ({
  isTodoTaskList,
  taskId,
  taskTitle,
  fullTaskList,
}: DeleteTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();
  const toDoTasks = fullTaskList.tasks.filter((task) => !task.isDone);
  const doneTasks = fullTaskList.tasks.filter((task) => task.isDone);

  const removeTask = (): void => {
    if (!isTodoTaskList && toDoTasks.length === 0 && doneTasks.length === 1) {
      dispatch(deleteTaskListFull(fullTaskList.id));
    } else if (
      !isTodoTaskList &&
      toDoTasks.length !== 0 &&
      doneTasks.length === 1
    ) {
      dispatch(deleteTaskListFromScreen(fullTaskList, false, true));
    } else {
      dispatch(deleteTask(fullTaskList.id, taskId));
    }
  };

  return (
    <ModalIcon
      okHandler={() => removeTask()}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure to delete{' '}
        <Text style={styles.redHighlightTask}>{taskTitle}</Text>?
      </Text>
    </ModalIcon>
  );
};
