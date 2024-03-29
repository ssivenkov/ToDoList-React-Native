import React, { useState } from 'react';

import MenuIcon from '@assets/images/icons/three-dots-vertical.svg';
import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { MenuHorizontal } from '@components/menus/menuHorizontal/MenuHorizontal';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { useStyles } from '@hooks/useStyles';
import { DeleteTaskButton } from '@screens/tasksScreen/buttons/deleteTaskButton/DeleteTaskButton';
import { DoneTaskButton } from '@screens/tasksScreen/buttons/doneTaskButton/DoneTaskButton';
import { EditTaskButton } from '@screens/tasksScreen/buttons/editTaskButton/EditTaskButton';
import { ToDoTaskButton } from '@screens/tasksScreen/buttons/toDoTaskButton/ToDoTaskButton';
import { taskTextSizeSelector, themeSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { taskStyles } from './styles';
import { IsMenuHorizontalVisibleType, TaskPropsType } from './types';

const { TRANSPARENT } = COLORS;

export const Task = (props: TaskPropsType) => {
  const {
    isTodo,
    taskListID,
    taskTitle,
    taskID,
    fullTaskList,
    colorMark,
    modificationDate,
    date,
  } = props;

  const theme = useSelector(themeSelector);
  const taskTextSize = useSelector(taskTextSizeSelector);

  const styles = useStyles(taskStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const [isMenuHorizontalVisible, setIsMenuHorizontalVisible] =
    useState<IsMenuHorizontalVisibleType>(false);

  const onMenuButtonPress = () => {
    if (isMenuHorizontalVisible) {
      setIsMenuHorizontalVisible(false);
    } else setIsMenuHorizontalVisible(true);
  };

  return (
    <View style={styles.taskContainer}>
      <MenuHorizontal
        buttons={
          <View style={styles.buttonsContainer}>
            <View style={menuHorizontalStyle.buttonWrapper}>
              <EditTaskButton
                colorMark={colorMark}
                date={date}
                isTodo={isTodo}
                modificationDate={modificationDate}
                oldTaskTitle={taskTitle}
                setIsMenuHorizontalVisible={setIsMenuHorizontalVisible}
                taskID={taskID}
                taskListID={taskListID}
              />
            </View>
            <View style={menuHorizontalStyle.buttonWrapper}>
              <DeleteTaskButton
                fullTaskList={fullTaskList}
                isTodoTaskList={isTodo}
                setIsMenuHorizontalVisible={setIsMenuHorizontalVisible}
                taskID={taskID}
                taskTitle={taskTitle}
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
        <View
          key={nanoid()}
          style={[styles.colorMark, { backgroundColor: colorMark || TRANSPARENT }]}
        />
        <Text key={nanoid()} style={[styles.text, { fontSize: taskTextSize }]}>
          {taskTitle}
        </Text>
        {isTodo ? (
          <DoneTaskButton taskID={taskID} taskListID={taskListID} taskTitle={taskTitle} />
        ) : (
          <ToDoTaskButton taskID={taskID} taskListID={taskListID} taskTitle={taskTitle} />
        )}
      </MenuHorizontal>
    </View>
  );
};
