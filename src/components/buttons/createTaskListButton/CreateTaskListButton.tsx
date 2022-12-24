import React, { useRef, useState } from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
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
import { TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const CreateTaskListButton = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [taskListTitle, setTaskListTitle] = useState<TaskListInterface['title']>('');

  const inputRef = useRef<TextInput>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const notEmptyTaskListTitleCondition = taskListTitle.length > 0;

  const onClosePress = (): void => {
    setTaskListTitle('');
  };

  const createTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    if (notEmptyTaskListTitleCondition) {
      const taskList: TaskListInterface = {
        id: nanoid(),
        date: createDate(),
        title: taskListTitle,
        showInToDo: true,
        isTodoCollapsed: false,
        isDoneCollapsed: false,
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
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon color={COLORS.WHITE} icon={faPlus} size={ICON_SIZE_MEDIUM} />
        </View>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.CreateTaskListButtonTitle')}
      inputFocus={inputFocus}
      okDisable={!taskListTitle}
      okHandler={createTaskList}
    >
      <CustomInput
        inputRef={inputRef}
        onValueChange={setTaskListTitle}
        value={taskListTitle}
      />
    </ModalIcon>
  );
};
