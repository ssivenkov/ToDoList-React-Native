import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {addNewTask} from '../../../../../store/actions/tasksActions/taskListActions';
import {
  TaskListType,
  TaskType,
} from '../../../../../store/reducers/taskListReducer/types';
import {ReturnComponentType} from '../../../../../types/common/returnComponentType';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton: FC<CreateTaskButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {taskListId, taskListTitle, fullTaskList} = props;
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    const taskId: string = Math.random().toString();
    const newTask: TaskType = {
      id: taskId,
      isDone: false,
      title: newTaskTitle,
    };

    const newTaskListNewTasks =
      fullTaskList.tasks.length === 0
        ? [newTask]
        : [...fullTaskList.tasks, newTask];

    const modifiedTaskList: TaskListType = {
      id: taskListId,
      title: taskListTitle,
      showInToDo: true,
      tasks: newTaskListNewTasks,
    };

    if (newTaskTitle) {
      dispatch(addNewTask(modifiedTaskList, taskListId));
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
