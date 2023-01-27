import React from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { setTaskIsDoneAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { Trans } from 'react-i18next';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { doneTaskButtonStyles } from './styles';
import { DoneTaskButtonPropsType } from './types';

export const DoneTaskButton = ({
  taskListID,
  doneTaskID,
  completedTaskTitle,
}: DoneTaskButtonPropsType) => {
  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const styles = useStyles(doneTaskButtonStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const setDoneTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    dispatch(
      setTaskIsDoneAction({
        doneTaskID,
        setIsLoading,
        setModalVisible,
        taskListID,
      }),
    );
  };

  return (
    <ModalIcon
      buttonIcon={
        <LinearGradient colors={taskMenuButtonGradient}>
          <View style={menuHorizontalStyle.leftButtonContainer}>
            <View style={commonButtonStyles.buttonContainer}>
              <FontAwesomeIcon
                color={theme.TEXT_COLOR}
                icon={faCheck}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      okHandler={setDoneTask}
    >
      <Text style={styles.warnText}>
        <Trans i18nKey='tasksScreen.DoneModalQuestion'>
          <Text style={styles.greenHighlightTask}>{{ text: completedTaskTitle }}</Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
