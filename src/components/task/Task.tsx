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
import { themeSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { taskStyles } from './styles';
import { IsMenuVisibleType, TaskPropsType } from './types';

export const Task = (props: TaskPropsType) => {
  const { isTodo, taskListID, taskTitle, taskID, fullTaskList, colorMark } = props;

  const { TRANSPARENT } = COLORS;

  const theme = useSelector(themeSelector);

  const styles = useStyles(taskStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const [isMenuVisible, setIsMenuVisible] = useState<IsMenuVisibleType>(false);

  const onMenuButtonPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    } else setIsMenuVisible(true);
  };

  return (
    <View style={styles.container}>
      <MenuHorizontal
        buttons={
          <View style={styles.buttonsContainer}>
            {isTodo && (
              <View style={menuHorizontalStyle.buttonWrapper}>
                <DoneTaskButton
                  completedTaskTitle={taskTitle}
                  doneTaskID={taskID}
                  taskListID={taskListID}
                />
              </View>
            )}
            <View style={menuHorizontalStyle.buttonWrapper}>
              <EditTaskButton
                colorMark={colorMark}
                isTodo={isTodo}
                oldTaskTitle={taskTitle}
                setIsMenuVisible={setIsMenuVisible}
                taskID={taskID}
                taskListID={taskListID}
              />
            </View>
            <View style={menuHorizontalStyle.buttonWrapper}>
              <DeleteTaskButton
                fullTaskList={fullTaskList}
                isTodoTaskList={isTodo}
                taskID={taskID}
                taskTitle={taskTitle}
              />
            </View>
          </View>
        }
        isMenuVisible={isMenuVisible}
        menuButtonIcon={
          <View style={commonButtonStyles.buttonContainer}>
            <MenuIcon fill={theme.ICON_BUTTON_COLOR} height={20} width={20} />
          </View>
        }
        onMenuButtonPress={onMenuButtonPress}
      >
        <>
          <View
            key={nanoid()}
            style={[styles.colorMark, { backgroundColor: colorMark || TRANSPARENT }]}
          />
          <Text key={nanoid()} style={styles.text}>
            {taskTitle}
          </Text>
        </>
      </MenuHorizontal>
    </View>
  );
};
