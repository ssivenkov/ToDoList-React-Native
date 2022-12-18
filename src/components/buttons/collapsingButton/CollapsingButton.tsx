import React from 'react';

import { CollapsingButtonPropsType } from '@components/buttons/collapsingButton/types';
import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
import { IconButton } from '@components/common/buttons/iconButton/IconButton';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setTaskListCollapsedAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/setTaskListCollapsedAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const CollapsingButton = (props: CollapsingButtonPropsType) => {
  const { taskListID, taskListsCount, isTodoTaskList, isTodoCollapsed, isDoneCollapsed } =
    props;

  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const todoTaskListCollapsedCondition =
    taskListsCount > 0 && isTodoTaskList && isTodoCollapsed;
  const todoTaskListUnCollapsedCondition =
    taskListsCount > 0 && isTodoTaskList && !isTodoCollapsed;
  const doneTaskListCollapsedCondition =
    taskListsCount > 0 && !isTodoTaskList && isDoneCollapsed;
  const doneTaskListUnCollapsedCondition =
    taskListsCount > 0 && !isTodoTaskList && !isDoneCollapsed;

  const setTodoTaskListCollapsed = () =>
    dispatch(
      setTaskListCollapsedAction({
        taskListID,
        isTodoCollapsed: true,
        isDoneCollapsed: isDoneCollapsed,
      }),
    );

  const setTodoTaskListUnCollapsed = () =>
    dispatch(
      setTaskListCollapsedAction({
        taskListID,
        isTodoCollapsed: false,
        isDoneCollapsed: isDoneCollapsed,
      }),
    );

  const setDoneTaskListCollapsed = () =>
    dispatch(
      setTaskListCollapsedAction({
        taskListID,
        isTodoCollapsed: isTodoCollapsed,
        isDoneCollapsed: true,
      }),
    );

  const setDoneTaskListUnCollapsed = () =>
    dispatch(
      setTaskListCollapsedAction({
        taskListID,
        isTodoCollapsed: isTodoCollapsed,
        isDoneCollapsed: false,
      }),
    );

  if (todoTaskListCollapsedCondition) {
    return (
      <IconButton
        icon={
          <View style={commonButtonStyles.buttonContainer}>
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faChevronDown}
              size={ICON_SIZE_SMALL}
            />
          </View>
        }
        onPress={setTodoTaskListUnCollapsed}
      />
    );
  }

  if (todoTaskListUnCollapsedCondition) {
    return (
      <IconButton
        icon={
          <View style={commonButtonStyles.buttonContainer}>
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faChevronUp}
              size={ICON_SIZE_SMALL}
            />
          </View>
        }
        onPress={setTodoTaskListCollapsed}
      />
    );
  }

  if (doneTaskListCollapsedCondition) {
    return (
      <IconButton
        icon={
          <View style={commonButtonStyles.buttonContainer}>
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faChevronDown}
              size={ICON_SIZE_SMALL}
            />
          </View>
        }
        onPress={setDoneTaskListUnCollapsed}
      />
    );
  }

  if (doneTaskListUnCollapsedCondition) {
    return (
      <IconButton
        icon={
          <View style={commonButtonStyles.buttonContainer}>
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faChevronUp}
              size={ICON_SIZE_SMALL}
            />
          </View>
        }
        onPress={setDoneTaskListCollapsed}
      />
    );
  }

  return null;
};
