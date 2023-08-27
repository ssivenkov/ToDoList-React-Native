import React, { useState } from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { SmallLoader } from '@components/loaders/smallLoader/SmallLoader';
import { IconWithScreenBlocking } from '@components/modals/IconWithScreenBlocking';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons/faUndoAlt';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setTaskIsToDoAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsToDoAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SetToDoTaskType, ToDoTaskButtonPropsType } from './types';

export const ToDoTaskButton = (props: ToDoTaskButtonPropsType) => {
  const { taskListID, taskID, taskTitle } = props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const [taskPending, setTaskPending] = useState<boolean>(false);

  const setDoneTask: SetToDoTaskType = (setScreenBlocking) => {
    dispatch(
      setTaskIsToDoAction({
        taskID,
        taskListID,
        setTaskPending,
        setTaskScreenBlocking: setScreenBlocking,
        shouldCreateSnackBarEvent: true,
        taskTitle,
      }),
    );
  };

  const icon = taskPending ? (
    <SmallLoader isDarkTheme={theme.darkMode} />
  ) : (
    <View style={commonButtonStyles.buttonContainer}>
      <FontAwesomeIcon
        color={theme.ICON_BUTTON_COLOR}
        icon={faUndoAlt}
        size={ICON_SIZE_SMALL}
      />
    </View>
  );

  return <IconWithScreenBlocking buttonIcon={icon} onPress={setDoneTask} />;
};
