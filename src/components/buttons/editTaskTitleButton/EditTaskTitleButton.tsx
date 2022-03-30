import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {setEditedTask} from '@store/actions/tasksActions/taskListActions';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {EditTaskTitleButtonPropsType} from './types';

export const EditTaskTitleButton = (props: EditTaskTitleButtonPropsType) => {
  const {taskListId, taskId, oldTaskTitle} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>(oldTaskTitle);

  const onOkPress = (): void => {
    if (editedTaskTitle.length > 0) {
      dispatch(setEditedTask(taskListId, taskId, editedTaskTitle));
      setEditedTaskTitle(editedTaskTitle);
    }
  };

  const onClosePress = (): void => {
    setEditedTaskTitle(oldTaskTitle);
  };

  return (
    <ModalIcon
      okHandler={() => onOkPress()}
      closeHandler={() => onClosePress()}
      okDisable={!editedTaskTitle}
      description={`${t('tasksInScreen.EditTaskButtonTitle')}`}
      buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
      <CustomInput value={editedTaskTitle} onValueChange={setEditedTaskTitle} />
    </ModalIcon>
  );
};
