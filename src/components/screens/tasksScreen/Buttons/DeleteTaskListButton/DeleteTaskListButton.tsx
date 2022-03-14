import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {iconSizeSmall} from '../../../../../constants/constants';
import {deleteTaskList} from '../../../../../store/actions/TasksActions/taskListActions';
import {ReturnComponentType} from '../../../../../types/common/ReturnComponentType';
import {ModalIcon} from '../../../../common/modals/ModalIcon';
import {styles} from './Styles';
import {DeleteTaskListButtonPropsType} from './Types';

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
