import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {setTaskIsDone} from '@store/actions/tasksActions/taskListActions';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
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
        Are you sure the task{' '}
        <Text style={styles.greenHighlightTask}>{completedTaskTitle}</Text> is
        completed?
      </Text>
    </ModalIcon>
  );
};
