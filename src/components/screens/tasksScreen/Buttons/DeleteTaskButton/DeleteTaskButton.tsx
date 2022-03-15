import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {
  deleteTask,
  deleteTaskListFromScreen,
} from '../../../../../store/actions/TasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {styles} from './Styles';
import {DeleteTaskButtonPropsType} from './Types';

export const DeleteTaskButton = ({
  isTodoTaskList,
  taskListId,
  taskListTasks,
  taskId,
  taskTitle,
  taskLists,
}: DeleteTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();
  const toDoTaskListsFilter = taskLists?.filter((taskList) => {
    if (
      !taskList.tasks?.length ||
      taskList.tasks?.some((task) => !task.isDone)
    ) {
      return taskList;
    }
  });
  const toDoTaskLists = toDoTaskListsFilter ? toDoTaskListsFilter : null;

  const removeTask = (): void => {
    if (
      !isTodoTaskList &&
      !toDoTaskLists &&
      taskListTasks &&
      taskListTasks.length === 1
    ) {
      dispatch(deleteTaskListFromScreen(taskLists, taskListId, true, false));
    } else dispatch(deleteTask(taskListId, taskId));
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
