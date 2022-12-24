import React, { useRef, useState } from 'react';

import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
import { CustomInput } from '@components/common/input/CustomInput';
import { ModalIcon } from '@components/common/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SetStateType } from '@root/types/common/types';
import { editTaskListTitleAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskListTitleButtonPropsType } from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListID,
}: EditTaskListTitleButtonPropsType) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const theme = useSelector(themeSelector);

  const inputRef = useRef<TextInput>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [editedTaskListTitle, setEditedTaskListTitle] =
    useState<TaskListInterface['title']>(oldTaskListTitle);

  const notEmptyTaskListTitleCondition = editedTaskListTitle.length > 0;

  const onOkPress = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (notEmptyTaskListTitleCondition) {
      dispatch(
        editTaskListTitleAction({
          taskListID,
          editedTaskListTitle,
          setIsLoading,
          setModalVisible,
          setEditedTaskListTitleState: setEditedTaskListTitle,
        }),
      );
    }
  };

  const onClosePress = (): void => {
    setEditedTaskListTitle(oldTaskListTitle);
  };

  return (
    <ModalIcon
      buttonIcon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faPen}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.EditTaskListButtonTitle')}
      inputFocus={inputFocus}
      okDisable={!editedTaskListTitle}
      okHandler={onOkPress}
    >
      <CustomInput
        inputRef={inputRef}
        onValueChange={setEditedTaskListTitle}
        value={editedTaskListTitle}
      />
    </ModalIcon>
  );
};
