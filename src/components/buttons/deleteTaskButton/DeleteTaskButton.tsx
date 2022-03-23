import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  deleteTask,
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '@store/actions/tasksActions/taskListActions';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {DeleteTaskButtonPropsType} from './types';

export const DeleteTaskButton = ({
  isTodoTaskList,
  taskId,
  taskTitle,
  fullTaskList,
}: DeleteTaskButtonPropsType): ReturnComponentType => {
  const {t} = useTranslation();
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
        {t('DeleteQuestionButtonTitle')}
        <Text style={styles.redHighlightTask}>{taskTitle}</Text>?
      </Text>
    </ModalIcon>
  );
};
