import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../../../constants/constants';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {DoneTaskButtonPropsType} from './Types';
import {Text} from 'react-native';
import {styles} from './Styles';

export const DoneTaskButton = ({
  completedTaskTitle,
}: DoneTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();

  const createTask = (): void => {
    /*dispatch(addNewTaskList(taskList));*/
  };

  return (
    <ModalIcon
      okHandler={() => createTask()}
      buttonIcon={<FontAwesomeIcon icon={faCheck} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure the task{' '}
        <Text style={styles.greenHighlightTask}>{completedTaskTitle}</Text> is
        completed?
      </Text>
    </ModalIcon>
  );
};
