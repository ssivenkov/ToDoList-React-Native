import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {setEditedTask} from '../../../../../store/actions/tasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/returnComponentType';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {EditTaskTitleButtonPropsType} from './types';

export const EditTaskTitleButton = (
  props: EditTaskTitleButtonPropsType,
): ReturnComponentType => {
  const {taskListId, taskId, oldTaskTitle} = props;
  const dispatch = useDispatch();
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>(oldTaskTitle);

  const editTaskTitle = (): void => {
    if (editedTaskTitle.length >= 1) {
      dispatch(setEditedTask(taskListId, taskId, editedTaskTitle));
      setEditedTaskTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => editTaskTitle()}
      description={'Edit task title:'}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <Input value={editedTaskTitle} onValueChange={setEditedTaskTitle} />
    </ModalIcon>
  );
};
