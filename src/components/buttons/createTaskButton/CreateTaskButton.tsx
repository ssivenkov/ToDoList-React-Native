import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {Notification} from '@components/common/notification/Notification';
import {iconSizeSmall} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createDate} from '@root/helpers/generateDate';
import {SetStateType} from '@root/types/common/types';
import {addNewTask} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const {taskListId, taskListDate, taskListTitle, fullTaskList} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isOn, setIsOn] = useState<boolean>(false);

  const toggleSwitcher = (isOn: boolean) => {
    if (!isOn) {
      setIsOn(false);
      setDate(new Date());
    } else setIsOn(true);
  };

  const onClosePress = (): void => {
    setNewTaskTitle('');
    setIsOn(false);
  };

  const createTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    const newTask: TaskType = {
      id: nanoid(),
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
          shouldCreateNotification: isOn,
          date,
          setIsLoading,
          setModalVisible,
          setNewTaskTitle,
          setIsOn,
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
      <Notification
        isOn={isOn}
        toggleSwitcher={toggleSwitcher}
        date={date}
        setDate={setDate}
      />
    </ModalIcon>
  );
};
