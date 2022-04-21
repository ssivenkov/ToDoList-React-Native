import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createDate} from '@root/helpers/GenerateDate';
import {SetStateType} from '@root/types/common/types';
import {addNewTask} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const {taskListId, taskListDate, taskListTitle, fullTaskList} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const onClosePress = (): void => {
    setNewTaskTitle('');
  };

  const createTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    const newTask: TaskType = {
      id: uuidv4(),
      date: createDate(),
      isDone: false,
      title: newTaskTitle,
    };

    const newTaskListNewTasks = fullTaskList.tasks
      ? [...fullTaskList.tasks, newTask]
      : [newTask];

    const modifiedTaskList: TaskListInterface = {
      id: taskListId,
      date: taskListDate,
      title: taskListTitle,
      showInToDo: true,
      tasks: newTaskListNewTasks,
    };

    if (newTaskTitle) {
      dispatch(
        addNewTask({
          modifiedTaskList,
          taskListId,
          newTask,
          setIsLoading,
          setModalVisible,
          setNewTaskTitle,
        }),
      );
    }
  };

  return (
    <ModalIcon
      okHandler={createTask}
      closeHandler={onClosePress}
      okDisable={!newTaskTitle}
      description={`${t('tasksScreen.CreateTaskButtonTitle')}`}
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={iconSizeSmall} />}>
      <CustomInput value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
