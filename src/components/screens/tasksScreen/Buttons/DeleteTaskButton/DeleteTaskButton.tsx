import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../../../constants/constants';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {DeleteTaskButtonPropsType} from './Types';
import {Text} from 'react-native';
import {styles} from './Styles';
import {deleteTask} from '../../../../../store/actions/TasksActions/taskListActions';

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
