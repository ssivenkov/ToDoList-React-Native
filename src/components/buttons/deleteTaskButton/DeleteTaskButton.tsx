import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  deleteTask,
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '@store/actions/tasksSagaActions/tasksSagaActions';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {DeleteTaskButtonPropsType} from './types';

export const DeleteTaskButton = ({
  isTodoTaskList,
  taskId,
  taskTitle,
  fullTaskList,
}: DeleteTaskButtonPropsType) => {
  const dispatch = useDispatch();
  const toDoTasks = fullTaskList.tasks
    ? fullTaskList.tasks.filter((task) => !task.isDone)
    : [];
  const doneTasks = fullTaskList.tasks
    ? fullTaskList.tasks.filter((task) => task.isDone)
    : [];

  const removeTask = (): void => {
    if (!isTodoTaskList && toDoTasks.length > 0 && doneTasks.length === 1) {
      dispatch(
        deleteTaskListFromScreen({
          fullTaskList,
          deleteTodoTask: false,
          deleteDoneTask: true,
        }),
      );
    } else if (
      !isTodoTaskList &&
      toDoTasks.length === 0 &&
      doneTasks.length === 1
    ) {
      dispatch(deleteTaskListFull({taskListId: fullTaskList.id}));
    } else {
      dispatch(deleteTask({taskListId: fullTaskList.id, taskId}));
    }
  };

  return (
    <ModalIcon
      okHandler={removeTask}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        <Trans i18nKey="tasksScreen.DeleteQuestionButtonTitle">
          <Text style={styles.redHighlightTask}>{{text: taskTitle}}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
