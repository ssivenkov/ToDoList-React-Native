import React, { useRef, useState } from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { Input } from '@components/inputs/Input';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SetStateType } from '@root/types/common/types';
import { editTaskListTitleAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import { TaskListType } from '@store/reducers/tasksReducer/types';
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

  const inputRef = useRef<TextInput>(null);

  const theme = useSelector(themeSelector);

  const { t } = useTranslation();

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
          taskListID,
          editedTaskListTitle,
          setIsLoading,
          setModalVisible,
          setEditedTaskListTitleState: setEditedTaskListTitle,
        }),
      );
    }
  };

  const onClosePress = () => {
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
