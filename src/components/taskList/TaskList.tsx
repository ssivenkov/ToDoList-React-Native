import React, { useMemo, useState } from 'react';

import MenuIcon from '@assets/images/icons/three-dots-vertical.svg';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { MenuHorizontal } from '@components/menus/menuHorizontal/MenuHorizontal';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { Task } from '@components/task/Task';
import { IsMenuHorizontalVisibleType } from '@components/task/types';
import { defaultSorting } from '@constants/defaultValues';
import { useStyles } from '@hooks/useStyles';
import { CollapsingButton } from '@screens/tasksScreen/buttons/collapsingButton/CollapsingButton';
import { CreateTaskButton } from '@screens/tasksScreen/buttons/createTaskButton/CreateTaskButton';
import { DeleteTaskListButton } from '@screens/tasksScreen/buttons/deleteTaskListButton/DeleteTaskListButton';
import { EditTaskListSortingButton } from '@screens/tasksScreen/buttons/editTaskListSortingButton/EditTaskListSortingButton';
import { EditTaskListTitleButton } from '@screens/tasksScreen/buttons/editTaskListTitleButton/EditTaskListTitleButton';
import { taskListTitleSizeSelector, themeSelector } from '@store/selectors/userSelectors';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { taskListStyles } from './styles';
import { TaskListPropsType } from './types';

export const TaskList = (props: TaskListPropsType) => {
  const {
    isTodoTaskList,
    taskListID,
    taskListDate,
    taskListTitle,
    taskListTasks = [],
    isTodoCollapsed,
    isDoneCollapsed,
    fullTaskList,
    sorting = defaultSorting,
  } = props;

  const styles = useStyles(taskListStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const theme = useSelector(themeSelector);
  const taskListTitleSize = useSelector(taskListTitleSizeSelector);

  const tasksForRender = useMemo(() => {
    return taskListTasks.map((task) => {
      const { id: taskID, title: taskTitle, colorMark } = task;

      return (
        <Task
          colorMark={colorMark}
          fullTaskList={fullTaskList}
          isTodo={isTodoTaskList}
          key={taskID}
          taskID={taskID}
          taskListID={taskListID}
          taskTitle={taskTitle}
        />
      );
    });
  }, [taskListTasks]);

  const [isMenuHorizontalVisible, setIsMenuHorizontalVisible] =
    useState<IsMenuHorizontalVisibleType>(false);

  const tasksCondition =
    (taskListTasks.length > 0 && isTodoTaskList && !isTodoCollapsed) ||
    (taskListTasks.length > 0 && !isTodoTaskList && !isDoneCollapsed);

  const onMenuButtonPress = () => {
    if (isMenuHorizontalVisible) {
      setIsMenuHorizontalVisible(false);
    } else setIsMenuHorizontalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuHorizontalWrapper}>
        <MenuHorizontal
          buttons={
            <View style={styles.buttonsContainer}>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <EditTaskListSortingButton
                  oldTaskListSorting={sorting}
                  setIsMenuHorizontalVisible={setIsMenuHorizontalVisible}
                  taskListID={taskListID}
                />
              </View>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <EditTaskListTitleButton
                  oldTaskListTitle={taskListTitle}
                  setIsMenuHorizontalVisible={setIsMenuHorizontalVisible}
                  taskListID={taskListID}
                />
              </View>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <DeleteTaskListButton
                  fullTaskList={fullTaskList}
                  isTodoTaskList={isTodoTaskList}
                  setIsMenuHorizontalVisible={setIsMenuHorizontalVisible}
                  taskListTitle={taskListTitle}
                />
              </View>
            </View>
          }
          isMenuHorizontalVisible={isMenuHorizontalVisible}
          menuButtonIcon={
            <View style={commonButtonStyles.buttonContainer}>
              <MenuIcon fill={theme.ICON_BUTTON_COLOR} height={20} width={20} />
            </View>
          }
          onMenuButtonPress={onMenuButtonPress}
        >
          <>
            <CollapsingButton
              isDoneCollapsed={isDoneCollapsed}
              isTodoCollapsed={isTodoCollapsed}
              isTodoTaskList={isTodoTaskList}
              taskListID={taskListID}
              taskListsCount={taskListTasks.length}
            />
            <Text style={[styles.title, { fontSize: taskListTitleSize }]}>
              {taskListTitle}
            </Text>
            {isTodoTaskList && (
              <CreateTaskButton
                fullTaskList={fullTaskList}
                taskListDate={taskListDate}
                taskListID={taskListID}
                taskListTitle={taskListTitle}
              />
            )}
          </>
        </MenuHorizontal>
      </View>

      {tasksCondition && <View style={styles.tasksContainer}>{tasksForRender}</View>}
    </View>
  );
};
