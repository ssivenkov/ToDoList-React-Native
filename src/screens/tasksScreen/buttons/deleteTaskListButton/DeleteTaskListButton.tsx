import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { deleteTaskListFromScreenAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import { deleteTaskListFullAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { Trans } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTaskListButtonStyles } from './styles';
import { DeleteTaskListButtonPropsType } from './types';

export const DeleteTaskListButton = (props: DeleteTaskListButtonPropsType) => {
  const { taskListTitle, isTodoTaskList, fullTaskList } = props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const styles = useStyles(deleteTaskListButtonStyles);

  const removeTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    const toDoTasks = fullTaskList.tasks
      ? fullTaskList.tasks.filter((task) => !task.isDone)
      : [];
    const doneTasks = fullTaskList.tasks
      ? fullTaskList.tasks.filter((task) => task.isDone)
      : [];

    const emptyDoneTasksCondition = isTodoTaskList && doneTasks.length === 0;
    const emptyToDoTasksCondition = !isTodoTaskList && toDoTasks.length === 0;
    const emptyAllTaskListsCondition = toDoTasks.length === 0 && doneTasks.length === 0;

    if (
      emptyDoneTasksCondition ||
      emptyToDoTasksCondition ||
      emptyAllTaskListsCondition
    ) {
      dispatch(
        deleteTaskListFullAction({
          taskListID: fullTaskList.id,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else if (isTodoTaskList) {
      dispatch(
        deleteTaskListFromScreenAction({
          fullTaskList,
          deleteTodoTask: true,
          deleteDoneTask: false,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else if (!isTodoTaskList) {
      dispatch(
        deleteTaskListFromScreenAction({
          fullTaskList,
          deleteTodoTask: false,
          deleteDoneTask: true,
          setIsLoading,
          setModalVisible,
        }),
      );
    }
  };

  return (
    <ModalIcon
      buttonIcon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faTrash}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      okHandler={removeTaskList}
    >
      <Text style={styles.warnText}>
        <Trans i18nKey='tasksScreen.DeleteQuestionButtonTitle'>
          <Text style={styles.redHighlightTask}>{{ text: taskListTitle }}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
