import React, { useRef, useState } from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { Input } from '@components/inputs/Input';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { editTaskListTitleAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import { TaskListType } from '@store/reducers/tasksReducer/types';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskListTitleButtonPropsType } from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListID,
  setIsMenuHorizontalVisible,
}: EditTaskListTitleButtonPropsType) => {
  const dispatch = useDispatch();

  const inputRef = useRef<TextInput>(null);

  const theme = useSelector(themeSelector);

  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const { t } = useTranslation();

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [editedTaskListTitle, setEditedTaskListTitle] =
    useState<TaskListType['title']>(oldTaskListTitle);

  const notEmptyTaskListTitleCondition = editedTaskListTitle.length > 0;

  const onOkPress = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    if (notEmptyTaskListTitleCondition) {
      dispatch(
        editTaskListTitleAction({
          editedTaskListTitle,
          setEditedTaskListTitleState: setEditedTaskListTitle,
          setIsLoading,
          setIsMenuHorizontalVisible,
          setModalVisible,
          taskListID,
        }),
      );
    }
  };

  const onClosePress = () => {
    setEditedTaskListTitle(oldTaskListTitle);
    setIsMenuHorizontalVisible(false);
  };

  return (
    <ModalIcon
      buttonIcon={
        <LinearGradient colors={taskMenuButtonGradient}>
          <View style={menuHorizontalStyle.middleButtonContainer}>
            <View style={commonButtonStyles.buttonContainer}>
              <FontAwesomeIcon
                color={theme.ICON_BUTTON_COLOR}
                icon={faPen}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.EditTaskListModalTitle')}
      inputFocus={inputFocus}
      okDisabled={!editedTaskListTitle}
      okHandler={onOkPress}
      okText={t('common.Confirm')}
    >
      <Input
        inputRef={inputRef}
        onChangeText={setEditedTaskListTitle}
        value={editedTaskListTitle}
      />
    </ModalIcon>
  );
};
