import React, { useEffect, useState } from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { ColorPickerComponent } from '@components/colorPicker/ColorPicker';
import { Input } from '@components/inputs/Input';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { Notification } from '@components/notification/Notification';
import { Switcher } from '@components/switcher/Switcher';
import {
  COLOR_PICKER_SHOW_TIMEOUT,
  colorPickerDefaultGapSize,
  ICON_SIZE_SMALL,
  MAX_INPUT_LENGTH200,
} from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { Nullable, SetStateType } from '@root/types/common/types';
import { setEditedTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { editTaskButtonStyles } from './styles';
import { EditTaskTitleButtonPropsType } from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const { taskListID, taskID, oldTaskTitle, colorMark, isTodo, setIsMenuVisible } = props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const styles = useStyles(editTaskButtonStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const { t } = useTranslation();

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showColorPickerWithUserColorMarkCondition =
    isColorPickerSwitcherOn && !!colorMark && modalVisible;
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

  const onClosePress = () => {
    setIsColorPickerSwitcherOn(!!colorMark ?? false);
    setEditedTaskTitle(oldTaskTitle);
    setIsNotificationSwitcherOn(!!taskNotification?.date ?? false);
    setDate(taskNotification?.date ?? null);
  };

  const setSelectedColor = (selectedColor: ColorType) => {
    dispatch(setSelectedColorAction({ selectedColor }));
  };

  const editTask = (setIsLoading: SetStateType<boolean>) => {
    if (notEmptyTaskTitleCondition && tempColorMark) {
      dispatch(
        setEditedTaskAction({
          taskListID,
          taskID,
          editedTaskTitle,
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setIsLoading,
          setModalVisible: setModalVisible,
          setEditedTaskTitle,
          shouldSetColor: isColorPickerSwitcherOn,
          setColorMark: setTempColorMark,
          colorMark: tempColorMark,
          setIsMenuVisible: setIsMenuVisible,
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
          setModalVisible: setModalVisible,
          setEditedTaskTitle,
          shouldSetColor: isColorPickerSwitcherOn,
          setColorMark: setTempColorMark,
          setIsMenuVisible: setIsMenuVisible,
        }),
      );

      setEditedTaskTitle(editedTaskTitle);
    }
  };

  useEffect(() => {
    if (showColorPickerWithUserColorMarkCondition) {
      setIsColorPickerSwitcherOn(false);
      setTimeout(() => {
        setIsColorPickerSwitcherOn(true);
      }, COLOR_PICKER_SHOW_TIMEOUT);
    }
  }, [modalVisible]);

  return (
    <ModalIcon
      buttonIcon={
        <LinearGradient colors={taskMenuButtonGradient}>
          <View style={menuHorizontalStyle.middleButtonContainer}>
            <View style={commonButtonStyles.buttonContainer}>
              <FontAwesomeIcon
                color={theme.TEXT_COLOR}
                icon={faPen}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.EditTaskButton')}
      modalVisibleFromProps={modalVisible}
      okDisabled={!editedTaskTitle}
      okHandler={editTask}
      setModalVisibleFromProps={setModalVisible}
    >
      <>
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
        {/* The task color picker component is rendered on this place for the color picker library to work correctly */}
        <View style={styles.colorSwitcherComponentContainer}>
          <Switcher
            containerStyle={styles.colorSwitcherContainer}
            isOn={isColorPickerSwitcherOn}
            onToggleSwitcherClick={handleColorPickerSwitcherClick}
            size='medium'
            switcherText={t('tasksScreen.EnableMarkColor')}
            textMargin={1}
            textStyle={styles.colorSwitcherText}
          />
        </View>
        {showColorPickerWithUserColorMarkCondition && (
          <ColorPickerComponent
            color={colorMark}
            gapSize={colorPickerDefaultGapSize}
            marginTop={20}
            setSelectedColor={setTempColorMark}
          />
        )}
        {isColorPickerSwitcherOn && !colorMark && (
          <ColorPickerComponent
            gapSize={colorPickerDefaultGapSize}
            marginTop={20}
            setSelectedColor={setSelectedColor}
          />
        )}
      </>
    </ModalIcon>
  );
};
