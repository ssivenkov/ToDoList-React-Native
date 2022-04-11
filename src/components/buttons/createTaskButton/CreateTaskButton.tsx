import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {addNewTask} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {TaskListType, TaskType} from '@store/reducers/tasksReducer/types';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton: FC<CreateTaskButtonPropsType> = (props) => {
  const {taskListId, taskListTitle, fullTaskList} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const createTask = (): void => {
    const taskId: string = uuidv4();
    const newTask: TaskType = {
      id: taskId,
      isDone: false,
      title: newTaskTitle,
    };

    const newTaskListNewTasks = fullTaskList.tasks
      ? [...fullTaskList.tasks, newTask]
      : [newTask];

    const modifiedTaskList: TaskListType = {
      id: taskListId,
      title: taskListTitle,
      showInToDo: true,
      tasks: newTaskListNewTasks,
    };

    if (newTaskTitle) {
      dispatch(addNewTask({modifiedTaskList, taskListId, newTask}));
      setNewTaskTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={createTask}
      okDisable={!newTaskTitle}
      description={`${t('tasksScreen.CreateTaskButtonTitle')}`}
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={iconSizeSmall} />}>
      <CustomInput value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
