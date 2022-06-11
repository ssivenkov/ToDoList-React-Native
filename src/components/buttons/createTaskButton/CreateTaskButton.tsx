import {styles} from '@components/buttons/createTaskButton/styles';
import {ColorPickerComponent} from '@components/common/colorPicker/ColorPicker';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {Notification} from '@components/common/notification/Notification';
import {Switcher} from '@components/common/switcher/Switcher';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createDate} from '@root/helpers/generateDateHelper';
import {useStyles} from '@root/hooks/useStyles';
import {SetStateType} from '@root/types/common/types';
import {addNewTaskAction} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';
import {ColorType} from '@store/reducers/userReducer/types';
import {
  accentColorSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';
import {CreateTaskButtonPropsType} from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const {taskListID, taskListDate, taskListTitle, fullTaskList} = props;

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const style = useStyles(styles);

  const [newTaskTitle, setNewTaskTitle] = useState<TaskType['title']>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isNotificationSwitcherOn, setIsNotificationSwitcherOn] =
    useState<boolean>(false);
  const [isColorPickerSwitcherOn, setIsColorPickerSwitcherOn] =
    useState<boolean>(false);
  const [color, setColor] = useState<ColorType>(accentColor);

  const handleNotificationSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsNotificationSwitcherOn(false);
      setDate(new Date());
    } else {
      setIsNotificationSwitcherOn(true);
    }
  };

  const handleColorPickerSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsColorPickerSwitcherOn(false);
    } else {
      setIsColorPickerSwitcherOn(true);
    }
  };

  const onClosePress = (): void => {
    setNewTaskTitle('');
    setIsNotificationSwitcherOn(false);
    setIsColorPickerSwitcherOn(false);
    setColor(accentColor);
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
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setIsLoading,
          setModalVisible,
          setNewTaskTitle,
          setIsNotificationSwitcherOn,
        }),
      );
    }
  };

  return (
    <ModalIcon
      okHandler={createTask}
      closeHandler={onClosePress}
      okDisable={!newTaskTitle}
      description={t('tasksScreen.CreateTaskButtonTitle')}
      buttonIcon={
        <FontAwesomeIcon
          icon={faPlus}
          size={ICON_SIZE_SMALL}
          color={theme.ICON_BUTTON_COLOR}
        />
      }>
      <CustomInput value={newTaskTitle} onValueChange={setNewTaskTitle} />
      <Notification
        isSwitcherOn={isNotificationSwitcherOn}
        onToggleSwitcherClick={handleNotificationSwitcherClick}
        date={date}
        setDate={setDate}
      />
      {/* The task color picker component is rendered this way for the color picker library to work correctly */}
      <View style={style.colorSwitcherComponentContainer}>
        <Switcher
          isOn={isColorPickerSwitcherOn}
          size={'medium'}
          switcherText={t('tasksScreen.EnableMarkColor')}
          onToggleSwitcherClick={handleColorPickerSwitcherClick}
          containerStyle={style.colorSwitcherContainer}
          textStyle={style.colorSwitcherText}
          textMargin={1}
        />
      </View>
      {isColorPickerSwitcherOn && (
        <ColorPickerComponent
          color={color}
          selectColor={setColor}
          marginTop={20}
          marginRight={20}
        />
      )}
    </ModalIcon>
  );
};
