import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../../../constants/constants';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {DeleteTaskListButtonPropsType} from './Types';
import {Text} from 'react-native';
import {styles} from './Styles';
import {deleteTaskList} from '../../../../../store/actions/TasksActions/taskListActions';

export const DeleteTaskListButton = (
  props: DeleteTaskListButtonPropsType,
): ReturnComponentType => {
  const {id, titleToBeDeletedTaskList} = props;
  const dispatch = useDispatch();

  const deleteTask = (): void => {
    dispatch(deleteTaskList(id));
  };

  return (
    <ModalIcon
      okHandler={() => deleteTask()}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure to delete{' '}
        <Text style={styles.redHighlightTask}>{titleToBeDeletedTaskList}</Text>?
      </Text>
    </ModalIcon>
  );
};
