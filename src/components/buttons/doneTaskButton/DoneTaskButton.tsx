import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {setTaskIsDone} from '@store/actions/tasksActions/taskListActions';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {styles} from './styles';
import {DoneTaskButtonPropsType} from './types';

export const DoneTaskButton = ({
  taskListId,
  doneTaskId,
  completedTaskTitle,
}: DoneTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();

  const setDoneTask = (): void => {
    dispatch(setTaskIsDone(taskListId, doneTaskId));
  };

  return (
    <ModalIcon
      okHandler={() => setDoneTask()}
      buttonIcon={<FontAwesomeIcon icon={faCheck} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        <Trans i18nKey="DoneButton">
          <Text key={uuidv4()} style={styles.greenHighlightTask}>
            {{text: completedTaskTitle}}
          </Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
