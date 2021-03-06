import React, { useState } from 'react';

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
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskListTitleButtonPropsType } from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListID,
}: EditTaskListTitleButtonPropsType) => {
  const theme = useSelector(themeSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [editedTaskListTitle, setEditedTaskListTitle] =
    useState<TaskListInterface['title']>(oldTaskListTitle);

  const onOkPress = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (editedTaskListTitle.length > 0) {
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
        <FontAwesomeIcon
          color={theme.ICON_BUTTON_COLOR}
          icon={faPen}
          size={ICON_SIZE_SMALL}
        />
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.EditTaskListButtonTitle')}
      okDisable={!editedTaskListTitle}
      okHandler={onOkPress}
    >
      <CustomInput onValueChange={setEditedTaskListTitle} value={editedTaskListTitle} />
    </ModalIcon>
  );
};
