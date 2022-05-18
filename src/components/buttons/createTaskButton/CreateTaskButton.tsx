import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {errorAlert} from '@root/helpers/alertHelper';
import {createDate} from '@root/helpers/generateDateHelper';
import {requestIOSNotificationsPermissionHelper} from '@root/helpers/requestIOSNotificationsPermissionHelper';
import {SetStateType} from '@root/types/common/types';
import {addNewTaskAction} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const {taskListID, taskListDate, taskListTitle, fullTaskList} = props;

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState<TaskType['title']>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggleSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsOn(false);
      setDate(new Date());
    } else {
      requestIOSNotificationsPermissionHelper().then((hasPermission) => {
        if (hasPermission) {
          setIsOn(true);
        } else {
          errorAlert(t('common.NoIOSNotificationsPermission'));
        }
      });
    }
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

    const tasks = fullTaskList.tasks
      ? [...fullTaskList.tasks, newTask]
      : [newTask];

    const modifiedTaskList: TaskListInterface = {
      id: taskListID,
      date: taskListDate,
      title: taskListTitle,
      showInToDo: true,
      tasks,
    };

    if (newTaskTitle) {
      dispatch(
        addNewTaskAction({
          modifiedTaskList,
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
      buttonIcon={<FontAwesomeIcon icon={faPlus} size={ICON_SIZE_SMALL} />}
      hasNotification={true}
      isOn={isOn}
      onToggleSwitcherClick={handleToggleSwitcherClick}
      date={date}
      setDate={setDate}>
      <CustomInput value={newTaskTitle} onValueChange={setNewTaskTitle} />
    </ModalIcon>
  );
};
