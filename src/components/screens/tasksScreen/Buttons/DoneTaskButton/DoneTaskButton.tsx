import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {setTaskIsDone} from '../../../../../store/actions/TasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {styles} from './Styles';
import {DoneTaskButtonPropsType} from './Types';

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
