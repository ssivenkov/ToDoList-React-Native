import React, { useState } from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { SmallLoader } from '@components/loaders/smallLoader/SmallLoader';
import { IconWithScreenBlocking } from '@components/modals/IconWithScreenBlocking';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setTaskIsDoneAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DoneTaskButtonPropsType, SetDoneTaskType } from './types';

export const DoneTaskButton = (props: DoneTaskButtonPropsType) => {
  const { taskListID, taskID, taskTitle } = props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const [taskPending, setTaskPending] = useState<boolean>(false);

  const setDoneTask: SetDoneTaskType = (setScreenBlocking) => {
    dispatch(
      setTaskIsDoneAction({
        taskID,
        taskListID,
        taskTitle,
        setTaskPending,
        setTaskScreenBlocking: setScreenBlocking,
        shouldCreateSnackBarEvent: true,
      }),
    );
  };

  const icon = taskPending ? (
    <SmallLoader isDarkTheme={theme.darkMode} />
  ) : (
    <View style={commonButtonStyles.buttonContainer}>
      <FontAwesomeIcon
        color={theme.ICON_BUTTON_COLOR}
        icon={faCheck}
        size={ICON_SIZE_SMALL}
      />
    </View>
  );

  return <IconWithScreenBlocking buttonIcon={icon} onPress={setDoneTask} />;
};
