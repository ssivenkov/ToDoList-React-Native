import React, { useState } from 'react';

import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
import { DeleteTaskButton } from '@components/buttons/deleteTaskButton/DeleteTaskButton';
import { DoneTaskButton } from '@components/buttons/doneTaskButton/DoneTaskButton';
import { EditTaskButton } from '@components/buttons/editTaskButton/EditTaskButton';
import { MenuHorizontal } from '@components/common/menus/menuHorizontal/MenuHorizontal';
import { menuHorizontalStyles } from '@components/common/menus/menuHorizontal/styles';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@root/hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import { IsMenuVisibleType, TaskPropsType } from './types';

export const Task = (props: TaskPropsType) => {
  const { isTodo, taskListID, taskTitle, taskID, fullTaskList, colorMark } = props;

  const theme = useSelector(themeSelector);

  const style = useStyles(styles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const [isMenuVisible, setIsMenuVisible] = useState<IsMenuVisibleType>(false);

  const onMenuButtonPress = (): void => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    } else setIsMenuVisible(true);
  };

  return (
    <View style={style.container}>
      <MenuHorizontal
        buttons={
          <View style={style.buttonsContainer}>
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
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faEllipsisV}
              size={ICON_SIZE_SMALL}
            />
          </View>
        }
        onMenuButtonPress={onMenuButtonPress}
      >
        <>
          <View
            key={nanoid()}
            style={[style.colorMark, { backgroundColor: colorMark || 'transparent' }]}
          />
          <Text key={nanoid()} style={style.text}>
            {taskTitle}
          </Text>
        </>
      </MenuHorizontal>
    </View>
  );
};
