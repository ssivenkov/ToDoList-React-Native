import {styles} from '@components/buttons/editTaskButton/styles';
import {ColorPickerComponent} from '@components/common/colorPicker/ColorPicker';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {Notification} from '@components/common/notification/Notification';
import {Switcher} from '@components/common/switcher/Switcher';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useStyles} from '@root/hooks/useStyles';
import {Nullable, SetStateType} from '@root/types/common/types';
import {setEditedTaskAction} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import {TaskType} from '@store/reducers/tasksReducer/types';
import {ColorType} from '@store/reducers/userReducer/types';
import {notificationsSelector} from '@store/selectors/tasksSelectors';
import {
  accentColorSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {EditTaskTitleButtonPropsType} from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const {taskListID, taskID, oldTaskTitle, colorMark, isTodo} = props;

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const style = useStyles(styles);

  const notifications = useSelector(notificationsSelector);
  const taskNotification = notifications.find((item) => item.taskID === taskID);

  const [editedTaskTitle, setEditedTaskTitle] =
    useState<TaskType['title']>(oldTaskTitle);
  const [date, setDate] = useState<Nullable<Date>>(
    taskNotification?.date ?? null,
  );
  const [isNotificationSwitcherOn, setIsNotificationSwitcherOn] =
    useState<boolean>(!!taskNotification?.date ?? false);
  const [isColorPickerSwitcherOn, setIsColorPickerSwitcherOn] =
    useState<boolean>(!!colorMark ?? false);
  const [color, setColor] = useState<ColorType>(colorMark ?? accentColor);
  const [modalVisible, setModalVisible1] = useState<boolean>(false);
  const conditionToShowColorPickerWithUserColor =
    isColorPickerSwitcherOn && !!colorMark && modalVisible;

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
    setColor(colorMark ?? accentColor);
    setEditedTaskTitle(oldTaskTitle);
    setIsNotificationSwitcherOn(!!taskNotification?.date ?? false);
    setDate(taskNotification?.date ?? null);
  };

  const editTask = (setIsLoading: SetStateType<boolean>): void => {
    if (editedTaskTitle.length > 0) {
      dispatch(
        setEditedTaskAction({
          taskListID,
          taskID,
          editedTaskTitle,
          shouldCreateNotification: isNotificationSwitcherOn,
          date,
          setIsLoading,
          setModalVisible: setModalVisible1,
          setEditedTaskTitle,
          colorMark: color,
          shouldSetColor: isColorPickerSwitcherOn,
          setColorInModal: setColor,
        }),
      );

      setEditedTaskTitle(editedTaskTitle);
    }
  };

  useEffect(() => {
    if (conditionToShowColorPickerWithUserColor) {
      setIsColorPickerSwitcherOn(false);
      setTimeout(() => {
        setIsColorPickerSwitcherOn(true);
      }, 100);
    }
  }, [modalVisible]);

  return (
    <ModalIcon
      okHandler={editTask}
      closeHandler={onClosePress}
      modalVisibleFromProps={modalVisible}
      setModalVisibleFromProps={setModalVisible1}
      okDisable={!editedTaskTitle}
      description={t('tasksScreen.EditTaskButton')}
      buttonIcon={
        <FontAwesomeIcon
          icon={faPen}
          size={ICON_SIZE_SMALL}
          color={theme.ICON_BUTTON_COLOR}
        />
      }>
      <CustomInput value={editedTaskTitle} onValueChange={setEditedTaskTitle} />
      {isTodo && (
        <Notification
          isSwitcherOn={isNotificationSwitcherOn}
          onToggleSwitcherClick={handleNotificationSwitcherClick}
          date={date}
          setDate={setDate}
        />
      )}
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
      {conditionToShowColorPickerWithUserColor && (
        <ColorPickerComponent
          color={color}
          selectColor={setColor}
          marginTop={20}
          marginRight={20}
        />
      )}
      {isColorPickerSwitcherOn && !colorMark && (
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
