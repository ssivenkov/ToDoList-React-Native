import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeLarge} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createDate} from '@root/helpers/generateDate';
import {SetStateType} from '@root/types/common/types';
import {addNewTaskList} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {styles} from './styles';

export const CreateTaskListButton = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>('');

  const onClosePress = (): void => {
    setNewTaskListTitle('');
  };

  const createTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (newTaskListTitle.length > 0) {
      const newTaskList: TaskListInterface = {
        id: uuidv4(),
        date: createDate(),
        title: newTaskListTitle,
        showInToDo: true,
      };

      dispatch(
        addNewTaskList({
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
          size={iconSizeLarge}
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
