import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setCollapsedTaskListAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CollapsingButtonPropsType } from './types';

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
      setCollapsedTaskListAction({
        isDoneCollapsed: isDoneCollapsed,
        isTodoCollapsed: true,
        taskListID,
      }),
    );

  const setTodoTaskListUnCollapsed = () =>
    dispatch(
      setCollapsedTaskListAction({
        isDoneCollapsed: isDoneCollapsed,
        isTodoCollapsed: false,
        taskListID,
      }),
    );

  const setDoneTaskListCollapsed = () =>
    dispatch(
      setCollapsedTaskListAction({
        isDoneCollapsed: true,
        isTodoCollapsed: isTodoCollapsed,
        taskListID,
      }),
    );

  const setDoneTaskListUnCollapsed = () =>
    dispatch(
      setCollapsedTaskListAction({
        isDoneCollapsed: false,
        isTodoCollapsed: isTodoCollapsed,
        taskListID,
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
