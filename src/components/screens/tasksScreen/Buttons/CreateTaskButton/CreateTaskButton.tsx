import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall, idLength} from '../../../../../constants/constants';
import {Input} from '../../../../common/input/Input';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {nanoid} from 'nanoid';
import {addNewTask} from '../../../../../store/actions/TasksActions/taskListActions';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {CreateTaskButtonPropsType} from '../CreateTaskListButton/Types';
import {
  TaskListType,
  TaskType,
} from '../../../../../store/reducers/taskListReducer/Types';

export const CreateTaskButton: FC<CreateTaskButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {taskListId, taskListTitle, tasksList} = props;
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    if (newTaskTitle) {
      const taskId: string = nanoid(idLength);
      const newTask: TaskType = {
        id: taskId,
        title: newTaskTitle,
        isDone: false,
      };
      const newTaskListNewTasks = tasksList
        ? [...tasksList, newTask]
        : [newTask];

      const modifiedTaskList: TaskListType = {
        id: taskListId,
        title: taskListTitle,
        tasks: newTaskListNewTasks,
      };

      dispatch(addNewTask(modifiedTaskList));
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
