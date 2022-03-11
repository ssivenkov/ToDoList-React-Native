import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {iconSizeLarge, idLength} from '../../../../../constants/constants';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {nanoid} from 'nanoid';
import {addNewTaskList} from '../../../../../store/actions/TasksActions/taskListActions';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {TaskListType} from '../../../../../store/reducers/taskListReducer/Types';

export const CreateTaskListButton = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>('');

  const createTaskList = (): void => {
    if (newTaskListTitle.length) {
      const id = nanoid(idLength);
      const taskList: TaskListType = {
        id,
        title: newTaskListTitle,
        tasks: null,
      };

      dispatch(addNewTaskList(taskList));
      setNewTaskListTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => createTaskList()}
      description={'Enter new task list title:'}
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={iconSizeLarge} />}>
      <Input value={newTaskListTitle} onValueChange={setNewTaskListTitle} />
    </ModalIcon>
  );
};
