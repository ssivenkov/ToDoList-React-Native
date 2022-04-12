import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {editTaskListTitle} from '@store/actions/tasksSagaActions/tasksSagaActions';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {EditTaskListTitleButtonPropsType} from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListId,
}: EditTaskListTitleButtonPropsType) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [editedTaskListTitle, setEditedTaskListTitleState] =
    useState<string>(oldTaskListTitle);

  const onOkPress = (): void => {
    if (editedTaskListTitle.length > 0) {
      dispatch(editTaskListTitle({taskListId, editedTaskListTitle}));
      setEditedTaskListTitleState(editedTaskListTitle);
    }
  };

  const onClosePress = (): void => {
    setEditedTaskListTitleState(oldTaskListTitle);
  };

  return (
    <ModalIcon
      okHandler={onOkPress}
      closeHandler={onClosePress}
      okDisable={!editedTaskListTitle}
      description={`${t('tasksScreen.EditTaskListButtonTitle')}`}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <CustomInput
        value={editedTaskListTitle}
        onValueChange={setEditedTaskListTitleState}
      />
    </ModalIcon>
  );
};