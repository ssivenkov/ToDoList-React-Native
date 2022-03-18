import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TaskListType} from 'store/reducers/taskListReducer/types';
import {iconSizeLarge} from '../../../constants/constants';
import {addNewTaskList} from '../../../store/actions/tasksActions/taskListActions';
import {Input} from '../../common/input/Input';
import {ModalIcon} from '../../common/modals/ModalIcon';

export const CreateTaskListButton = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>('');

  const createTaskList = (): void => {
    if (newTaskListTitle.length) {
      const id: string = Math.random().toString();
      const taskList: TaskListType = {
        id,
        title: newTaskListTitle,
        showInToDo: true,
        tasks: [],
      };

      dispatch(addNewTaskList(taskList));
      setNewTaskListTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => createTaskList()}
      description={'Enter new task list title:'}
      buttonIcon={
        <FontAwesomeIcon
          icon={faPlus}
          size={iconSizeLarge}
          style={{color: '#fff'}}
        />
      }>
      <Input value={newTaskListTitle} onValueChange={setNewTaskListTitle} />
    </ModalIcon>
  );
};
