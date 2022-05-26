import {ModalIcon} from '@components/common/modals/ModalIcon';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SetStateType} from '@root/types/common/types';
import {setTaskIsDoneAction} from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {DoneTaskButtonPropsType} from './types';

export const DoneTaskButton = ({
  taskListID,
  doneTaskID,
  completedTaskTitle,
}: DoneTaskButtonPropsType) => {
  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const setDoneTask = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
    dispatch(
      setTaskIsDoneAction({
        taskListID,
        doneTaskID,
        setIsLoading,
        setModalVisible,
      }),
    );
  };

  return (
    <ModalIcon
      okHandler={setDoneTask}
      buttonIcon={<FontAwesomeIcon icon={faCheck} size={ICON_SIZE_SMALL} />}>
      <Text style={styles(theme).warnText}>
        <Trans i18nKey="tasksScreen.DoneButton">
          <Text style={styles().greenHighlightTask}>
            {{text: completedTaskTitle}}
          </Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
