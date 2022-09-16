import React, { useEffect, useState } from 'react';

import { commonButtonStyles } from '@components/buttons/common/styles/styles';
import { styles } from '@components/buttons/editTaskButton/styles';
import { ColorPickerComponent } from '@components/common/colorPicker/ColorPicker';
import { CustomInput } from '@components/common/input/CustomInput';
import { ModalIcon } from '@components/common/modals/ModalIcon';
import { Notification } from '@components/common/notification/Notification';
import { Switcher } from '@components/common/switcher/Switcher';
import { COLOR_PICKER_SHOW_TIMEOUT, ICON_SIZE_SMALL } from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@root/hooks/useStyles';
import { Nullable, SetStateType } from '@root/types/common/types';
import { setEditedTaskAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import { setSelectedColorAction } from '@store/actions/userReducerActions/setSelectedColorAction';
import { TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskTitleButtonPropsType } from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const { taskListID, taskID, oldTaskTitle, colorMark, isTodo } = props;

  const theme = useSelector(themeSelector);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const style = useStyles(styles);

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

  const onClosePress = (): void => {
    setIsColorPickerSwitcherOn(!!colorMark ?? false);
    setEditedTaskTitle(oldTaskTitle);
    setIsNotificationSwitcherOn(!!taskNotification?.date ?? false);
    setDate(taskNotification?.date ?? null);
  };

  const setSelectedColor = (selectedColor: ColorType) => {
    dispatch(setSelectedColorAction({ selectedColor }));
  };

  const editTask = (setIsLoading: SetStateType<boolean>): void => {
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
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faPen}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.EditTaskButton')}
      modalVisibleFromProps={modalVisible}
      okDisable={!editedTaskTitle}
      okHandler={editTask}
      setModalVisibleFromProps={setModalVisible}
    >
      <>
        <CustomInput onValueChange={setEditedTaskTitle} value={editedTaskTitle} />
        {isTodo && (
          <Notification
            date={date}
            isSwitcherOn={isNotificationSwitcherOn}
            onToggleSwitcherClick={handleNotificationSwitcherClick}
            setDate={setDate}
          />
        )}
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
        {showColorPickerWithUserColorMarkCondition && (
          <ColorPickerComponent
            color={colorMark}
            marginRight={20}
            marginTop={20}
            setSelectedColor={setTempColorMark}
          />
        )}
        {isColorPickerSwitcherOn && !colorMark && (
          <ColorPickerComponent
            marginRight={20}
            marginTop={20}
            setSelectedColor={setSelectedColor}
          />
        )}
      </>
    </ModalIcon>
  );
};
