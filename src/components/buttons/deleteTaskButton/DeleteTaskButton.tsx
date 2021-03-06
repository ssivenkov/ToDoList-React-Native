import React from 'react';

import { ModalIcon } from '@components/common/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@root/hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { deleteTaskListFromScreenAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import { deleteTaskListFullAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import { deleteTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTaskAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { Trans } from 'react-i18next';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { DeleteTaskButtonPropsType } from './types';

export const DeleteTaskButton = (props: DeleteTaskButtonPropsType) => {
  const { isTodoTaskList, taskID, taskTitle, fullTaskList } = props;
  const { tasks } = fullTaskList;

  const theme = useSelector(themeSelector);
  const style = useStyles(styles);
  const dispatch = useDispatch();

  const toDoTasks = tasks ? tasks.filter((task) => !task.isDone) : [];
  const doneTasks = tasks ? tasks.filter((task) => task.isDone) : [];

  const removeTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (!isTodoTaskList && toDoTasks.length > 0 && doneTasks.length === 1) {
      dispatch(
        deleteTaskListFromScreenAction({
          fullTaskList,
          deleteTodoTask: false,
          deleteDoneTask: true,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else if (!isTodoTaskList && toDoTasks.length === 0 && doneTasks.length === 1) {
      dispatch(
        deleteTaskListFullAction({
          taskListID: fullTaskList.id,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else {
      dispatch(
        deleteTaskAction({
          taskListID: fullTaskList.id,
          taskID,
          setIsLoading,
          setModalVisible,
        }),
      );
    }
  };

  return (
    <ModalIcon
      buttonIcon={
        <FontAwesomeIcon
          color={theme.ICON_BUTTON_COLOR}
          icon={faTrash}
          size={ICON_SIZE_SMALL}
        />
      }
      okHandler={removeTask}
    >
      <Text style={style.warnText}>
        <Trans i18nKey='tasksScreen.DeleteQuestionButtonTitle'>
          <Text style={style.redHighlightTask}>{{ text: taskTitle }}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
