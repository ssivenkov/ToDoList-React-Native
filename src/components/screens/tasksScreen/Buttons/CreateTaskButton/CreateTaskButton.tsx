import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {addNewTask} from '../../../../../store/actions/TasksActions/taskListActions';
import {
  TaskListType,
  TaskType,
} from '../../../../../store/reducers/taskListReducer/Types';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {CreateTaskButtonPropsType} from './Types';

export const CreateTaskButton: FC<CreateTaskButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {taskListId, taskListTitle, tasks} = props;
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    if (newTaskTitle) {
      const taskId: string = Math.random().toString();
      const newTask: TaskType = {
        id: taskId,
        title: newTaskTitle,
        isDone: false,
      };
      const newTaskListNewTasks = tasks ? [...tasks, newTask] : [newTask];

      const modifiedTaskList: TaskListType = {
        id: taskListId,
        title: taskListTitle,
        showInToDo: true,
        tasks: newTaskListNewTasks,
      };

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
