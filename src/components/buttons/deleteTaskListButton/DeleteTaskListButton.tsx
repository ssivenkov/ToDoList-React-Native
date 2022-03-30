import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  deleteTaskListFromScreen,
  deleteTaskListFull,
} from '@store/actions/tasksActions/taskListActions';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {styles} from './styles';
import {DeleteTaskListButtonPropsType} from './types';

export const DeleteTaskListButton = (props: DeleteTaskListButtonPropsType) => {
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
        <Trans i18nKey="tasksInScreen.DeleteQuestionButtonTitle">
          <Text key={uuidv4()} style={styles.redHighlightTask}>
            {{text: titleToBeDeletedTaskList}}
          </Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
