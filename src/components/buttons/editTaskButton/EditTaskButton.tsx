import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {Notification} from '@components/common/notification/Notification';
import {iconSizeSmall} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Nullable, SetStateType} from '@root/types/common/types';
import {setEditedTask} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTask';
import {getNotifications} from '@store/selectors/tasksSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {EditTaskTitleButtonPropsType} from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const {taskListId, taskId, oldTaskTitle, isTodo} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>(oldTaskTitle);
  const notifications = useSelector(getNotifications);
  const taskNotification = notifications.find((item) => item.taskID === taskId);
  const [date, setDate] = useState<Nullable<Date>>(
    taskNotification?.date ?? null,
  );
  const [isOn, setIsOn] = useState<boolean>(!!taskNotification?.date ?? false);

  const toggleSwitcher = (isOn: boolean) => {
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
        setEditedTask({
          taskListId,
          taskId,
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
      description={`${t('tasksScreen.EditTaskButton')}`}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <CustomInput value={editedTaskTitle} onValueChange={setEditedTaskTitle} />
      {isTodo && (
        <Notification
          isOn={isOn}
          toggleSwitcher={toggleSwitcher}
          date={date}
          setDate={setDate}
        />
      )}
    </ModalIcon>
  );
};
