import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall, idLength} from '../../../../../constants/constants';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {nanoid} from 'nanoid';
import {addNewTaskList} from '../../../../../store/actions/TasksActions/taskListActions';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';

export const CreateTaskButton = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    if (newTaskTitle.length >= 1) {
      const id = nanoid(idLength);
      const taskList = {
        id: id,
        title: newTaskTitle,
        tasks: null,
      };

      dispatch(addNewTaskList(taskList));
      setNewTaskTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => createTask()}
      description={'Enter new task title:'}
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={iconSizeSmall} />}>
      <Input value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
