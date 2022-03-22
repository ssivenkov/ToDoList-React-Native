import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {addNewTask} from '@store/actions/tasksActions/taskListActions';
import {TaskListType, TaskType} from '@store/reducers/taskListReducer/types';
import React, {FC, useState} from 'react';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton: FC<CreateTaskButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {taskListId, taskListTitle, fullTaskList} = props;
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    const taskId: string = uuidv4();
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
      okDisable={!newTaskTitle}
      description={'Enter new task title:'}
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={iconSizeSmall} />}>
      <CustomInput value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
