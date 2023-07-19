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
import { deleteTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTaskAction';
import {
  modalWindowTextSizeSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { Trans } from 'react-i18next';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTaskButtonStyles } from './styles';
import { DeleteTaskButtonPropsType } from './types';

export const DeleteTaskButton = (props: DeleteTaskButtonPropsType) => {
  const { isTodoTaskList, taskID, taskTitle, fullTaskList, setIsMenuHorizontalVisible } =
    props;

  const { tasks } = fullTaskList;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);
  const modalWindowTextSize = useSelector(modalWindowTextSizeSelector);

  const styles = useStyles(deleteTaskButtonStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const toDoTasks = tasks ? tasks.filter((task) => !task.isDone) : [];
  const doneTasks = tasks ? tasks.filter((task) => task.isDone) : [];

  const removeFromScreenCondition =
    !isTodoTaskList && toDoTasks.length > 0 && doneTasks.length === 1;
  const fullRemoveTaskListCondition =
    !isTodoTaskList && toDoTasks.length === 0 && doneTasks.length === 1;

  const removeTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    if (removeFromScreenCondition) {
      dispatch(
        deleteTaskListFromScreenAction({
          deleteDoneTask: true,
          deleteTodoTask: false,
          fullTaskList,
          setIsLoading,
          setModalVisible,
        }),
      );
    } else if (fullRemoveTaskListCondition) {
      dispatch(
        deleteTaskListFullAction({
          setIsLoading,
          setModalVisible,
          taskListID: fullTaskList.id,
        }),
      );
    } else {
      dispatch(
        deleteTaskAction({
          setIsLoading,
          setModalVisible,
          taskID,
          taskListID: fullTaskList.id,
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
                color={theme.TEXT_COLOR}
                icon={faTrash}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      closeHandler={closeHandler}
      okHandler={removeTask}
    >
      <Text style={[styles.warnText, { fontSize: modalWindowTextSize }]}>
        <Trans i18nKey='tasksScreen.DeleteModalQuestion'>
          <Text style={styles.redHighlightTask}>{{ text: taskTitle }}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
