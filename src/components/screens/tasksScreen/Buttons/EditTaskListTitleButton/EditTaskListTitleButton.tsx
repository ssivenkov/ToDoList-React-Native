import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../../../constants/constants';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {EditTaskListTitleButtonPropsType} from './Types';
import {setEditedTaskList} from '../../../../../store/actions/TasksActions/taskListActions';

export const EditTaskListTitleButton = ({
  oldTitle,
  id,
  tasks,
}: EditTaskListTitleButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>(oldTitle);

  const addNewTaskList = (): void => {
    if (newTaskListTitle.length >= 1) {
      const editedTaskList = {
        id: id,
        title: newTaskListTitle,
        tasks: tasks,
      };

      dispatch(setEditedTaskList(editedTaskList));
      setNewTaskListTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => addNewTaskList()}
      description={'Edit task list title:'}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <Input value={newTaskListTitle} onValueChange={setNewTaskListTitle} />
    </ModalIcon>
  );
};
