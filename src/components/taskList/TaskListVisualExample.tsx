import React, { useState } from 'react';

import MenuIcon from '@assets/images/icons/three-dots-vertical.svg';
import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { styles as iconButtonStyles } from '@components/buttons/iconButton/styles';
import { MenuHorizontal } from '@components/menus/menuHorizontal/MenuHorizontal';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { IsMenuHorizontalVisibleType } from '@components/task/types';
import { taskListStyles } from '@components/taskList/styles';
import { TaskListVisualExamplePropsType } from '@components/taskList/types';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SimpleCollapsingButton } from '@screens/tasksScreen/buttons/collapsingButton/SimpleCollapsingButton';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

export const TaskListVisualExample = (props: TaskListVisualExamplePropsType) => {
  const { tasks, title, taskListTitleSize } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMenuHorizontalVisible, setIsMenuHorizontalVisible] =
    useState<IsMenuHorizontalVisibleType>(false);

  const styles = useStyles(taskListStyles);
  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const theme = useSelector(themeSelector);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const onMenuButtonPress = () => {
    if (isMenuHorizontalVisible) {
      setIsMenuHorizontalVisible(false);
    } else setIsMenuHorizontalVisible(true);
  };

  return (
    <View style={styles.visualExampleContainer}>
      <View style={styles.menuHorizontalWrapper}>
        <MenuHorizontal
          buttons={
            <View style={styles.buttonsContainer}>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <LinearGradient colors={taskMenuButtonGradient}>
                  <View style={menuHorizontalStyle.leftButtonContainer}>
                    <View style={commonButtonStyles.buttonContainer}>
                      <FontAwesomeIcon
                        color={theme.ICON_BUTTON_COLOR}
                        icon={faSort}
                        size={ICON_SIZE_SMALL}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <LinearGradient colors={taskMenuButtonGradient}>
                  <View style={menuHorizontalStyle.middleButtonContainer}>
                    <View style={commonButtonStyles.buttonContainer}>
                      <FontAwesomeIcon
                        color={theme.ICON_BUTTON_COLOR}
                        icon={faPen}
                        size={ICON_SIZE_SMALL}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View style={menuHorizontalStyle.buttonWrapper}>
                <LinearGradient colors={taskMenuButtonGradient}>
                  <View style={menuHorizontalStyle.rightButtonContainer}>
                    <View style={commonButtonStyles.buttonContainer}>
                      <FontAwesomeIcon
                        color={theme.ICON_BUTTON_COLOR}
                        icon={faTrash}
                        size={ICON_SIZE_SMALL}
                      />
                    </View>
                  </View>
                </LinearGradient>
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
            <SimpleCollapsingButton
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <Text style={[styles.visualExampleTitle, { fontSize: taskListTitleSize }]}>
              {title}
            </Text>
            <View style={iconButtonStyles.icon}>
              <View style={commonButtonStyles.buttonContainer}>
                <FontAwesomeIcon
                  color={theme.ICON_BUTTON_COLOR}
                  icon={faPlus}
                  size={ICON_SIZE_SMALL}
                />
              </View>
            </View>
          </>
        </MenuHorizontal>
      </View>

      {!isCollapsed && <View style={styles.tasksContainer}>{tasks}</View>}
    </View>
  );
};
