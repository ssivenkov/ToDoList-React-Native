import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {ICON_SIZE_LARGE} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createDate} from '@root/helpers/generateDateHelper';
import {SetStateType} from '@root/types/common/types';
import {addNewTaskListAction} from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

export const CreateTaskListButton = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [newTaskListTitle, setNewTaskListTitle] =
    useState<TaskListInterface['title']>('');

  const onClosePress = (): void => {
    setNewTaskListTitle('');
  };

  const createTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (newTaskListTitle.length > 0) {
      const newTaskList: TaskListInterface = {
        id: nanoid(),
        date: createDate(),
        title: newTaskListTitle,
        showInToDo: true,
      };

      dispatch(
        addNewTaskListAction({
          newTaskList,
          setIsLoading,
          setModalVisible,
          setNewTaskListTitle,
        }),
      );
    }
  };

  return (
    <ModalIcon
      okHandler={createTaskList}
      closeHandler={onClosePress}
      okDisable={!newTaskListTitle}
      description={`${t('tasksScreen.CreateTaskListButtonTitle')}`}
      buttonIcon={
        <FontAwesomeIcon
          icon={faPlus}
          size={ICON_SIZE_LARGE}
          style={styles.icon}
        />
      }>
      <CustomInput
        value={newTaskListTitle}
        onValueChange={setNewTaskListTitle}
      />
    </ModalIcon>
  );
};
