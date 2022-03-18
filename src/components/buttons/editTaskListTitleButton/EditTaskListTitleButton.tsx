import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../commonTypes/returnComponentType';
import {iconSizeSmall} from '../../../constants/constants';
import {setEditedTaskListTitle} from '../../../store/actions/tasksActions/taskListActions';
import {Input} from '../../common/input/Input';
import {ModalIcon} from '../../common/modals/ModalIcon';
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
      description={'Edit task list title:'}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <Input
        value={editedTaskListTitle}
        onValueChange={setEditedTaskListTitleState}
      />
    </ModalIcon>
  );
};
