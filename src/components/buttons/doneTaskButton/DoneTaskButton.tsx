import {ModalIcon} from '@components/common/modals/ModalIcon';
import {ICON_SIZE_SMALL} from '@constants/constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useStyles} from '@root/hooks/useStyles';
import {SetStateType} from '@root/types/common/types';
import {setTaskIsDoneAction} from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {DoneTaskButtonPropsType} from './types';

export const DoneTaskButton = ({
  taskListID,
  doneTaskID,
  completedTaskTitle,
}: DoneTaskButtonPropsType) => {
  const dispatch = useDispatch();
  const style = useStyles(styles);

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
      buttonIcon={
        <FontAwesomeIcon
          icon={faCheck}
          size={ICON_SIZE_SMALL}
          style={style.icon}
        />
      }>
      <Text style={style.warnText}>
        <Trans i18nKey="tasksScreen.DoneButton">
          <Text style={style.greenHighlightTask}>
            {{text: completedTaskTitle}}
          </Text>
        </Trans>
      </Text>
    </ModalIcon>
  );
};
