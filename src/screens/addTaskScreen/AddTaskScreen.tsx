import React, { useEffect, useRef, useState } from 'react';

import { ColorPickerComponent } from '@components/colorPicker/ColorPicker';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { Input } from '@components/inputs/Input';
import { Notification } from '@components/notification/Notification';
import { Switcher } from '@components/switcher/Switcher';
import { colorPickerDefaultGapSize, MAX_INPUT_LENGTH200 } from '@constants/constants';
import { createDate } from '@helpers/generateDateHelper';
import { useStyles } from '@hooks/useStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SetStateType } from '@root/types/common/types';
import { SendNewTaskButton } from '@screens/addTaskScreen/sendNewTaskButton/SendNewTaskButton';
import { AddTaskScreenRouteType } from '@screens/addTaskScreen/types';
import { addNewTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addTaskScreenStyles } from './styles';

export const AddTaskScreen = () => {
  const { taskListID, taskListDate, taskListTitle, fullTaskList } =
    useRoute<AddTaskScreenRouteType>().params;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const styles = useStyles(addTaskScreenStyles);

  const selectedColor = useSelector(selectedColorSelector);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const inputRef = useRef<TextInput>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [newTaskTitle, setNewTaskTitle] = useState<TaskType['title']>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isNotificationSwitcherOn, setIsNotificationSwitcherOn] =
    useState<boolean>(false);
  const [isColorPickerSwitcherOn, setIsColorPickerSwitcherOn] = useState<boolean>(false);

  const handleNotificationSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsNotificationSwitcherOn(false);
    } else {
      setDate(new Date());
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

  const setSelectedColor = (selectedColor: ColorType) => {
    dispatch(setSelectedColorAction({ selectedColor }));
  };

  const sendNewTask = (
    setLoading: SetStateType<boolean>,
    setButtonDisabled: SetStateType<boolean>,
  ) => {
    const newTask: TaskType = {
      id: nanoid(),
      date: createDate(),
      isDone: false,
      title: newTaskTitle,
      colorMark: selectedColor,
    };

    if (!isColorPickerSwitcherOn) {
      delete newTask.colorMark;
    }

    const tasks = fullTaskList.tasks ? [...fullTaskList.tasks, newTask] : [newTask];

    const modifiedTaskList: TaskListInterface = {
      id: taskListID,
      date: taskListDate,
      title: taskListTitle,
      showInToDo: true,
      tasks,
      isTodoCollapsed: fullTaskList.isTodoCollapsed,
      isDoneCollapsed: fullTaskList.isDoneCollapsed,
    };

    if (newTaskTitle) {
      dispatch(
        addNewTaskAction({
          modifiedTaskList,
          newTask,
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setLoading,
          setButtonDisabled,
          goBack,
          setNewTaskTitle,
          setIsNotificationSwitcherOn,
        }),
      );
    }
  };

  useEffect(() => {
    if (inputFocus) {
      inputFocus();
    }
  }, []);

  return (
    <View>
      <Header
        leftButton={<GoBackButton />}
        rightButton={<SendNewTaskButton sendNewTask={sendNewTask} />}
        title={t('tasksScreen.CreateTaskButtonTitle')}
      />
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.contentContainer}>
          <Input
            inputRef={inputRef}
            maxLength={MAX_INPUT_LENGTH200}
            onValueChange={setNewTaskTitle}
            value={newTaskTitle}
          />
          <Notification
            date={date}
            isSwitcherOn={isNotificationSwitcherOn}
            onToggleSwitcherClick={handleNotificationSwitcherClick}
            setDate={setDate}
          />
          <View style={styles.colorPickerSwitcherWrapper}>
            <Switcher
              containerStyle={styles.colorPickerSwitcherContainer}
              isOn={isColorPickerSwitcherOn}
              onToggleSwitcherClick={handleColorPickerSwitcherClick}
              size='medium'
              switcherMarginLeft={15}
              switcherText={t('tasksScreen.EnableMarkColor')}
              textMarginBottom={1}
              textStyle={styles.colorPickerSwitcherText}
            />
          </View>
          {isColorPickerSwitcherOn && (
            <View style={styles.colorPickerWrapper}>
              <ColorPickerComponent
                color={selectedColor}
                gapSize={colorPickerDefaultGapSize}
                setSelectedColor={setSelectedColor}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
