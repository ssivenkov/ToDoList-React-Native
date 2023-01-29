import React, { useEffect, useRef, useState } from 'react';

import { ColorPickerComponent } from '@components/colorPicker/ColorPicker';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { Input } from '@components/inputs/Input';
import { Notification } from '@components/notification/Notification';
import { Switcher } from '@components/switcher/Switcher';
import {
  colorPickerDefaultGapSize,
  INPUT_MAX_LENGTH200,
  screenWidth480px,
  switcherMargin,
} from '@constants/constants';
import { createFormattedDateHelper } from '@helpers/dateHelpers';
import { useStyles } from '@hooks/useStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SetStateType } from '@root/types/common/types';
import { SendNewTaskButton } from '@screens/addTaskScreen/sendNewTaskButton/SendNewTaskButton';
import { AddTaskScreenRouteType } from '@screens/addTaskScreen/types';
import { addNewTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
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

  const { width: appWidth } = useWindowDimensions();

  const colorPickerGapSizeOnNarrowScreen = 0;

  const colorPickerGapSize =
    appWidth <= screenWidth480px
      ? colorPickerGapSizeOnNarrowScreen
      : colorPickerDefaultGapSize;

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
      colorMark: selectedColor,
      date: createFormattedDateHelper(),
      id: nanoid(),
      isDone: false,
      title: newTaskTitle,
    };

    if (!isColorPickerSwitcherOn) {
      delete newTask.colorMark;
    }

    const tasks = fullTaskList.tasks ? [...fullTaskList.tasks, newTask] : [newTask];

    const modifiedTaskList: TaskListType = {
      date: taskListDate,
      id: taskListID,
      isDoneCollapsed: fullTaskList.isDoneCollapsed,
      isTodoCollapsed: fullTaskList.isTodoCollapsed,
      showInToDo: true,
      tasks,
      title: taskListTitle,
    };

    if (newTaskTitle) {
      dispatch(
        addNewTaskAction({
          date,
          goBack,
          modifiedTaskList,
          newTask,
          setButtonDisabled,
          setIsNotificationSwitcherOn,
          setLoading,
          setNewTaskTitle,
          shouldCreateNotification: isNotificationSwitcherOn,
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
        title={t('addTaskScreen.HeaderTitle')}
      />
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.contentContainer}>
          <Input
            inputRef={inputRef}
            maxLength={INPUT_MAX_LENGTH200}
            onChangeText={setNewTaskTitle}
            suptext={t('addTaskScreen.AddTaskInputSuptitle')}
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
              switcherMarginRight={switcherMargin}
              switcherText={t('tasksScreen.EnableColorMark')}
              textMarginBottom={1}
              textStyle={styles.colorPickerSwitcherText}
            />
          </View>
          {isColorPickerSwitcherOn && (
            <View style={styles.colorPickerWrapper}>
              <ColorPickerComponent
                color={selectedColor}
                gapSize={colorPickerGapSize}
                setSelectedColor={setSelectedColor}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
