import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {deleteTask} from '../../../../../store/actions/TasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {styles} from './Styles';
import {DeleteTaskButtonPropsType} from './Types';

export const DeleteTaskButton = ({
  titleToBeDeletedTask,
  taskListId,
  taskId,
}: DeleteTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();

  const removeTask = (): void => {
    dispatch(deleteTask(taskListId, taskId));
  };

  return (
    <ModalIcon
      okHandler={() => removeTask()}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure to delete{' '}
        <Text style={styles.redHighlightTask}>{titleToBeDeletedTask}</Text>?
      </Text>
    </ModalIcon>
  );
};
