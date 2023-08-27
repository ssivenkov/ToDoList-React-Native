import React from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { deleteTaskListFromScreenAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import { deleteTaskListFullAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import {
  modalWindowTextSizeSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { Trans } from 'react-i18next';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTaskListButtonStyles } from './styles';
import { DeleteTaskListButtonPropsType } from './types';

export const DeleteTaskListButton = (props: DeleteTaskListButtonPropsType) => {
  const { taskListTitle, isTodoTaskList, fullTaskList, setIsMenuHorizontalVisible } =
    props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);
  const modalWindowTextSize = useSelector(modalWindowTextSizeSelector);

  const styles = useStyles(deleteTaskListButtonStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

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
          setIsLoading,
          setModalVisible,
          taskListID: fullTaskList.id,
        }),
      );
    } else if (isTodoTaskList) {
      dispatch(
        deleteTaskListFromScreenAction({
          deleteDoneTask: false,
          deleteTodoTask: true,
          fullTaskList,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else if (!isTodoTaskList) {
      dispatch(
        deleteTaskListFromScreenAction({
          deleteDoneTask: true,
          deleteTodoTask: false,
          fullTaskList,
          setIsLoading,
          setModalVisible,
        }),
      );
    }
  };

  const closeHandler = () => {
    setIsMenuHorizontalVisible(false);
  };

  return (
    <ModalIcon
      buttonIcon={
        <LinearGradient colors={taskMenuButtonGradient}>
          <View style={menuHorizontalStyle.rightButtonContainer}>
            <View style={commonButtonStyles.buttonContainer}>
              <FontAwesomeIcon
                color={theme.ICON_BUTTON_COLOR}
                icon={faTrash}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      closeHandler={closeHandler}
      okHandler={removeTaskList}
    >
      <Text style={[styles.warnText, { fontSize: modalWindowTextSize }]}>
        <Trans i18nKey='tasksScreen.DeleteModalQuestion'>
          <Text style={styles.redHighlightTask}>{{ text: taskListTitle }}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
