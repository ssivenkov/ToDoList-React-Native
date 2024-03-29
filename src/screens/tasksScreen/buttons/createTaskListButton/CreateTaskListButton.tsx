import React, { useRef, useState } from 'react';

import { COLORS } from '@colors/colors';
import { headerStyles } from '@components/header/styles';
import { Input } from '@components/inputs/Input';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { defaultSorting } from '@constants/defaultValues';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createFormattedDateHelper } from '@helpers/dateHelpers';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { addNewTaskListAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import { TaskListType } from '@store/reducers/tasksReducer/types';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import 'react-native-get-random-values';
import { TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const CreateTaskListButton = () => {
  const dispatch = useDispatch();

  const headerStyle = useStyles(headerStyles);

  const { t } = useTranslation();

  const [taskListTitle, setTaskListTitle] = useState<TaskListType['title']>('');

  const inputRef = useRef<TextInput>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const notEmptyTaskListTitleCondition = taskListTitle.length > 0;

  const onClosePress = () => {
    setTaskListTitle('');
  };

  const createTaskList = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    if (notEmptyTaskListTitleCondition) {
      const taskList: TaskListType = {
        date: createFormattedDateHelper(),
        id: nanoid(),
        isDoneCollapsed: false,
        isTodoCollapsed: false,
        showInToDo: true,
        title: taskListTitle,
        sorting: defaultSorting,
      };

      dispatch(
        addNewTaskListAction({
          setIsLoading,
          setModalVisible,
          setTaskListTitle,
          taskList,
        }),
      );
    }
  };

  return (
    <ModalIcon
      buttonIcon={
        <View style={headerStyle.rightButtonContainer}>
          <FontAwesomeIcon color={COLORS.WHITE} icon={faPlus} size={ICON_SIZE_MEDIUM} />
        </View>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.CreateTaskListModalTitle')}
      inputFocus={inputFocus}
      okDisabled={!taskListTitle}
      okHandler={createTaskList}
      okText={t('common.Confirm')}
    >
      <Input inputRef={inputRef} onChangeText={setTaskListTitle} value={taskListTitle} />
    </ModalIcon>
  );
};
