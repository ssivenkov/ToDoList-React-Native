import React, { useState } from 'react';

import { ColorPickerComponent } from '@components/colorPicker/ColorPicker';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { Input } from '@components/inputs/Input';
import { Notification } from '@components/notification/Notification';
import { Switcher } from '@components/switcher/Switcher';
import { colorPickerDefaultGapSize, MAX_INPUT_LENGTH200 } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Nullable, SetStateType } from '@root/types/common/types';
import { SendEditedTaskButton } from '@screens/editTaskScreen/sendEditedTaskButton/SendEditedTaskButton';
import { EditTaskScreenRouteType } from '@screens/editTaskScreen/types';
import { setEditedTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { editTaskScreenStyles } from './styles';

export const EditTaskScreen = () => {
  const { colorMark, isTodo, oldTaskTitle, taskID, taskListID } =
    useRoute<EditTaskScreenRouteType>().params;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const styles = useStyles(editTaskScreenStyles);

  const { t } = useTranslation();

  const notifications = useSelector(notificationsSelector);

  const taskNotification = notifications.find((item) => item.taskID === taskID);

  const [editedTaskTitle, setEditedTaskTitle] = useState<TaskType['title']>(oldTaskTitle);
  const [date, setDate] = useState<Nullable<Date>>(taskNotification?.date ?? null);
  const [isNotificationSwitcherOn, setIsNotificationSwitcherOn] = useState<boolean>(
    !!taskNotification?.date ?? false,
  );
  const [isColorPickerSwitcherOn, setIsColorPickerSwitcherOn] = useState<boolean>(
    !!colorMark ?? false,
  );
  const [tempColorMark, setTempColorMark] = useState<ColorType>(colorMark ?? '');

  const goBack = () => {
    navigation.goBack();
  };

  const showColorPickerWithUserColorMarkCondition =
    isColorPickerSwitcherOn && !!colorMark;
  const notEmptyTaskTitleCondition = editedTaskTitle.length > 0;

  const handleNotificationSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsNotificationSwitcherOn(false);
      setDate(null);
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

  const sendEditedTask = (setIsLoading: SetStateType<boolean>) => {
    if (notEmptyTaskTitleCondition && tempColorMark) {
      dispatch(
        setEditedTaskAction({
          taskListID,
          taskID,
          editedTaskTitle,
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setIsLoading,
          goBack,
          setEditedTaskTitle,
          shouldSetColor: isColorPickerSwitcherOn,
          setColorMark: setTempColorMark,
          colorMark: tempColorMark,
        }),
      );

      setEditedTaskTitle(editedTaskTitle);
    } else if (notEmptyTaskTitleCondition) {
      dispatch(
        setEditedTaskAction({
          taskListID,
          taskID,
          editedTaskTitle,
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setIsLoading,
          goBack,
          setEditedTaskTitle,
          shouldSetColor: isColorPickerSwitcherOn,
          setColorMark: setTempColorMark,
        }),
      );

      setEditedTaskTitle(editedTaskTitle);
    }
  };

  return (
    <View>
      <Header
        leftButton={<GoBackButton />}
        rightButton={<SendEditedTaskButton sendEditedTask={sendEditedTask} />}
        title={t('tasksScreen.EditTaskButton')}
      />
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.contentContainer}>
          <Input
            maxLength={MAX_INPUT_LENGTH200}
            onValueChange={setEditedTaskTitle}
            value={editedTaskTitle}
          />
          {isTodo && (
            <Notification
              date={date}
              isSwitcherOn={isNotificationSwitcherOn}
              onToggleSwitcherClick={handleNotificationSwitcherClick}
              setDate={setDate}
            />
          )}
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
          {showColorPickerWithUserColorMarkCondition && (
            <View style={styles.colorPickerWrapper}>
              <ColorPickerComponent
                color={colorMark}
                gapSize={colorPickerDefaultGapSize}
                setSelectedColor={setTempColorMark}
              />
            </View>
          )}
          {isColorPickerSwitcherOn && !colorMark && (
            <View style={styles.colorPickerWrapper}>
              <ColorPickerComponent
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
