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

export const DeleteTaskButton = ({
  titleToBeDeletedTask,
}: DeleteTaskButtonPropsType): ReturnComponentType => {
  const dispatch = useDispatch();

  const createTask = (): void => {
    /*dispatch(addNewTaskList(taskList));*/
  };

  return (
    <ModalIcon
      okHandler={() => createTask()}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure to delete{' '}
        <Text style={styles.redHighlightTask}>{titleToBeDeletedTask}</Text>?
      </Text>
    </ModalIcon>
  );
};
