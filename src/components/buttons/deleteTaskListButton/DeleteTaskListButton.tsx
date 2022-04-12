import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '@store/actions/tasksSagaActions/tasksSagaActions';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {DeleteTaskListButtonPropsType} from './types';

export const DeleteTaskListButton = (props: DeleteTaskListButtonPropsType) => {
  const {taskListTitle, isTodoTaskList, fullTaskList} = props;
  const dispatch = useDispatch();

  const removeTaskList = (): void => {
    const toDoTasks = fullTaskList.tasks
      ? fullTaskList.tasks.filter((task) => !task.isDone)
      : [];
    const doneTasks = fullTaskList.tasks
      ? fullTaskList.tasks.filter((task) => task.isDone)
      : [];

    if (
      (isTodoTaskList && doneTasks.length === 0) ||
      (!isTodoTaskList && toDoTasks.length === 0) ||
      (!toDoTasks && !doneTasks)
    ) {
      console.log('попали в if');
      dispatch(deleteTaskListFull({taskListId: fullTaskList.id}));
    } else if (isTodoTaskList && !!toDoTasks && !!doneTasks) {
      dispatch(
        deleteTaskListFromScreen({
          fullTaskList,
          deleteTodoTask: true,
          deleteDoneTask: false,
        }),
      );
    } else if (!isTodoTaskList && !!toDoTasks && !!doneTasks) {
      dispatch(
        deleteTaskListFromScreen({
          fullTaskList,
          deleteTodoTask: false,
          deleteDoneTask: true,
        }),
      );
    }
  };

  return (
    <ModalIcon
      okHandler={removeTaskList}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        <Trans i18nKey="tasksScreen.DeleteQuestionButtonTitle">
          <Text style={styles.redHighlightTask}>{{text: taskListTitle}}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
