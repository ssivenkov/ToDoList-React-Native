import React, { useState } from 'react';

import { commonButtonStyles } from '@components/buttons/common/styles/styles';
import { styles } from '@components/buttons/createTaskButton/styles';
import { ColorPickerComponent } from '@components/common/colorPicker/ColorPicker';
import { CustomInput } from '@components/common/input/CustomInput';
import { ModalIcon } from '@components/common/modals/ModalIcon';
import { Notification } from '@components/common/notification/Notification';
import { Switcher } from '@components/common/switcher/Switcher';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createDate } from '@root/helpers/generateDateHelper';
import { useStyles } from '@root/hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { addNewTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector, themeSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

import { CreateTaskButtonPropsType } from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const { taskListID, taskListDate, taskListTitle, fullTaskList } = props;

  const theme = useSelector(themeSelector);
  const selectedColor = useSelector(selectedColorSelector);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const style = useStyles(styles);

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

  const onClosePress = (): void => {
    setIsColorPickerSwitcherOn(false);
    setNewTaskTitle('');
    setIsNotificationSwitcherOn(false);
    setIsColorPickerSwitcherOn(false);
  };

  const setSelectedColor = (selectedColor: ColorType) => {
    dispatch(setSelectedColorAction({ selectedColor }));
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
      buttonIcon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faPlus}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.CreateTaskButtonTitle')}
      okDisable={!newTaskTitle}
      okHandler={createTask}
    >
      <>
        <CustomInput onValueChange={setNewTaskTitle} value={newTaskTitle} />
        <Notification
          date={date}
          isSwitcherOn={isNotificationSwitcherOn}
          onToggleSwitcherClick={handleNotificationSwitcherClick}
          setDate={setDate}
        />
        {/* The task color picker component is rendered on this place for the color picker library to work correctly */}
        <View style={style.colorSwitcherComponentContainer}>
          <Switcher
            containerStyle={style.colorSwitcherContainer}
            isOn={isColorPickerSwitcherOn}
            onToggleSwitcherClick={handleColorPickerSwitcherClick}
            size='medium'
            switcherText={t('tasksScreen.EnableMarkColor')}
            textMargin={1}
            textStyle={style.colorSwitcherText}
          />
        </View>
        {isColorPickerSwitcherOn && (
          <ColorPickerComponent
            color={selectedColor}
            marginRight={20}
            marginTop={20}
            setSelectedColor={setSelectedColor}
          />
        )}
      </>
    </ModalIcon>
  );
};
