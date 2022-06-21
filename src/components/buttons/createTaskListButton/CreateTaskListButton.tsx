import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { CustomInput } from '@components/common/input/CustomInput';
import { ModalIcon } from '@components/common/modals/ModalIcon';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createDate } from '@root/helpers/generateDateHelper';
import { SetStateType } from '@root/types/common/types';
import { addNewTaskListAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import 'react-native-get-random-values';
import { useDispatch } from 'react-redux';

export const CreateTaskListButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [taskListTitle, setTaskListTitle] = useState<TaskListInterface['title']>('');

  const onClosePress = (): void => {
    setTaskListTitle('');
  };

  const createTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (taskListTitle.length > 0) {
      const taskList: TaskListInterface = {
        id: nanoid(),
        date: createDate(),
        title: taskListTitle,
        showInToDo: true,
      };

      dispatch(
        addNewTaskListAction({
          taskList,
          setIsLoading,
          setModalVisible,
          setTaskListTitle,
        }),
      );
    }
  };

  return (
    <ModalIcon
      buttonIcon={
        <FontAwesomeIcon color={COLORS.WHITE} icon={faPlus} size={ICON_SIZE_MEDIUM} />
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.CreateTaskListButtonTitle')}
      okDisable={!taskListTitle}
      okHandler={createTaskList}
    >
      <CustomInput onValueChange={setTaskListTitle} value={taskListTitle} />
    </ModalIcon>
  );
};
