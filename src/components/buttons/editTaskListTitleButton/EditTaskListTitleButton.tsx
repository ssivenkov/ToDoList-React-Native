import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {setEditedTaskListTitle} from '@store/actions/tasksActions/taskListActions';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {EditTaskListTitleButtonPropsType} from './types';

export const EditTaskListTitleButton = ({
  oldTaskListTitle,
  taskListId,
}: EditTaskListTitleButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();
  const [editedTaskListTitle, setEditedTaskListTitleState] =
    useState<string>(oldTaskListTitle);

  const editTaskList = (): void => {
    if (editedTaskListTitle.length >= 1) {
      dispatch(setEditedTaskListTitle(taskListId, editedTaskListTitle));
      setEditedTaskListTitleState('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => editTaskList()}
      okDisable={!editedTaskListTitle}
      description={'Edit task list title:'}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <CustomInput
        value={editedTaskListTitle}
        onValueChange={setEditedTaskListTitleState}
      />
    </ModalIcon>
  );
};
