import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {setEditedTaskListTitle} from '@store/actions/tasksActions/taskListActions';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {EditTaskListTitleButtonPropsType} from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListId,
}: EditTaskListTitleButtonPropsType): ReturnComponentType => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [editedTaskListTitle, setEditedTaskListTitleState] =
    useState<string>(oldTaskListTitle);

  const onOkPress = (): void => {
    if (editedTaskListTitle.length >= 1) {
      dispatch(setEditedTaskListTitle(taskListId, editedTaskListTitle));
      setEditedTaskListTitleState('');
    }
  };

  const onClosePress = (): void => {
    setEditedTaskListTitleState(oldTaskListTitle);
  };

  return (
    <ModalIcon
      okHandler={() => onOkPress()}
      closeHandler={() => onClosePress()}
      okDisable={!editedTaskListTitle}
      description={`${t('tasksInScreen.EditTaskListButtonTitle')}`}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <CustomInput
        value={editedTaskListTitle}
        onValueChange={setEditedTaskListTitleState}
      />
    </ModalIcon>
  );
};
