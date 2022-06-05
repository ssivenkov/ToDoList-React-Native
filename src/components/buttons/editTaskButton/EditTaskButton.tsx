import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {Notification} from '@components/common/notification/Notification';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Nullable, SetStateType} from '@root/types/common/types';
import {setEditedTaskAction} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import {TaskType} from '@store/reducers/tasksReducer/types';
import {notificationsSelector} from '@store/selectors/tasksSelectors';
import {themeSelector} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {EditTaskTitleButtonPropsType} from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const {taskListID, taskID, oldTaskTitle, isTodo} = props;

  const theme = useSelector(themeSelector);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const notifications = useSelector(notificationsSelector);
  const taskNotification = notifications.find((item) => item.taskID === taskID);
  const [editedTaskTitle, setEditedTaskTitle] =
    useState<TaskType['title']>(oldTaskTitle);
  const [date, setDate] = useState<Nullable<Date>>(
    taskNotification?.date ?? null,
  );
  const [isOn, setIsOn] = useState<boolean>(!!taskNotification?.date ?? false);

  const handleToggleSwitcherClick = (isOn: boolean) => {
    if (!isOn) {
      setIsOn(false);
      setDate(null);
    } else {
      setIsOn(true);
      setDate(new Date());
    }
  };

  const onClosePress = (): void => {
    setEditedTaskTitle(oldTaskTitle);
    setIsOn(!!taskNotification?.date ?? false);
    setDate(taskNotification?.date ?? null);
  };

  const editTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (editedTaskTitle.length > 0) {
      dispatch(
        setEditedTaskAction({
          taskListID,
          taskID,
          editedTaskTitle,
          shouldCreateNotification: isOn,
          date,
          setIsLoading,
          setModalVisible,
          setEditedTaskTitle,
        }),
      );
      setEditedTaskTitle(editedTaskTitle);
    }
  };

  return (
    <ModalIcon
      okHandler={editTask}
      closeHandler={onClosePress}
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
          isSwitcherOn={isOn}
          onToggleSwitcherClick={handleToggleSwitcherClick}
          date={date}
          setDate={setDate}
        />
      )}
    </ModalIcon>
  );
};
