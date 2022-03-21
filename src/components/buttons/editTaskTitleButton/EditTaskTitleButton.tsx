import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../commonTypes/returnComponentType';
import {iconSizeSmall} from '../../../constants/constants';
import {setEditedTask} from '../../../store/actions/tasksActions/taskListActions';
import {CustomInput} from '../../common/input/CustomInput';
import {ModalIcon} from '../../common/modals/ModalIcon';
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
      <CustomInput value={editedTaskTitle} onValueChange={setEditedTaskTitle} />
    </ModalIcon>
  );
};
