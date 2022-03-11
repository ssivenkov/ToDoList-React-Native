import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../../../constants/constants';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {EditTaskTitleButtonPropsType} from './Types';
import {Input} from '../../../../common/input/Input';
import {addNewTaskList} from '../../../../../store/actions/TasksActions/taskListActions';

export const EditTaskTitleButton = ({
  titleToBeEditedTask,
}: EditTaskTitleButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>(titleToBeEditedTask);

  const createTask = (): void => {
    if (newTaskTitle.length >= 1) {
      const taskList = {
        id: '123',
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
      description={'Edit task title:'}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <Input value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
