import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ReturnComponentType} from '../../../commonTypes/returnComponentType';
import {iconSizeSmall} from '../../../constants/constants';
import {
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '../../../store/actions/tasksActions/taskListActions';
import {ModalIcon} from '../../common/modals/ModalIcon';
import {styles} from './styles';
import {DeleteTaskListButtonPropsType} from './types';

export const DeleteTaskListButton = (
  props: DeleteTaskListButtonPropsType,
): ReturnComponentType => {
  const {titleToBeDeletedTaskList, isTodoTaskList, fullTaskList} = props;
  const dispatch = useDispatch();

  const removeTaskList = (): void => {
    const toDoTasks = fullTaskList.tasks.filter((task) => !task.isDone);
    const doneTasks = fullTaskList.tasks.filter((task) => task.isDone);

    if (
      (isTodoTaskList && doneTasks.length === 0) ||
      (!isTodoTaskList && toDoTasks.length === 0)
    ) {
      dispatch(deleteTaskListFull(fullTaskList.id));
    } else if (isTodoTaskList && !!toDoTasks && !!doneTasks) {
      dispatch(deleteTaskListFromScreen(fullTaskList, true, false));
    } else if (!isTodoTaskList && !!toDoTasks && !!doneTasks) {
      dispatch(deleteTaskListFromScreen(fullTaskList, false, true));
    }
  };

  return (
    <ModalIcon
      okHandler={() => removeTaskList()}
      buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        Are you sure to delete{' '}
        <Text style={styles.redHighlightTask}>{titleToBeDeletedTaskList}</Text>?
      </Text>
    </ModalIcon>
  );
};
