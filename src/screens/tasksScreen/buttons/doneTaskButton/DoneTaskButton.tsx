import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setTaskIsDoneAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DoneTaskButtonPropsType } from './types';

export const DoneTaskButton = ({ taskListID, doneTaskID }: DoneTaskButtonPropsType) => {
  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const setDoneTask = () => {
    dispatch(
      setTaskIsDoneAction({
        doneTaskID,
        taskListID,
      }),
    );
  };

  return (
    <IconButton
      icon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faCheck}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      onPress={setDoneTask}
    />
  );
};
