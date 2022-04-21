import {ModalIcon} from '@components/common/modals/ModalIcon';
import {iconSizeSmall} from '@constants/constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SetStateType} from '@root/types/common/types';
import {setTaskIsDone} from '@store/actions/tasksSagaActions/tasksSagaActions';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {styles} from './styles';
import {DoneTaskButtonPropsType} from './types';

export const DoneTaskButton = ({
  taskListId,
  doneTaskId,
  completedTaskTitle,
}: DoneTaskButtonPropsType) => {
  const dispatch = useDispatch();

  const setDoneTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    dispatch(
      setTaskIsDone({taskListId, doneTaskId, setIsLoading, setModalVisible}),
    );
  };

  return (
    <ModalIcon
      okHandler={setDoneTask}
      buttonIcon={<FontAwesomeIcon icon={faCheck} size={iconSizeSmall} />}>
      <Text style={styles.warnText}>
        <Trans i18nKey="tasksScreen.DoneButton">
          <Text key={uuidv4()} style={styles.greenHighlightTask}>
            {{text: completedTaskTitle}}
          </Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
