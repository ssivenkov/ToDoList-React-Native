import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomInput} from '@components/common/input/CustomInput';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeLarge} from '@constants/constants';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {addNewTaskList} from '@store/actions/tasksActions/taskListActions';
import {TaskListType} from '@store/reducers/taskListReducer/types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {styles} from './styles';

export const CreateTaskListButton = (): ReturnComponentType => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>('');

  const createTaskList = (): void => {
    if (newTaskListTitle.length) {
      const id: string = uuidv4();
      const taskList: TaskListType = {
        id,
        title: newTaskListTitle,
        showInToDo: true,
        tasks: [],
      };

      dispatch(addNewTaskList(taskList));
      setNewTaskListTitle('');
    }
  };

  return (
    <ModalIcon
      okHandler={() => createTaskList()}
      okDisable={!newTaskListTitle}
      description={`${t('tasksInScreen.CreateTaskListButtonTitle')}`}
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
