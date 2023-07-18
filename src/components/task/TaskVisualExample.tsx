import React, { useState } from 'react';

import MenuIcon from '@assets/images/icons/three-dots-vertical.svg';
import { COLORS } from '@colors/colors';
import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { styles as iconButtonStyles } from '@components/buttons/iconButton/styles';
import { MenuHorizontal } from '@components/menus/menuHorizontal/MenuHorizontal';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import {
  IsMenuHorizontalVisibleType,
  TaskVisualExamplePropsType,
} from '@components/task/types';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { taskStyles } from './styles';

const { TRANSPARENT } = COLORS;

export const TaskVisualExample = (props: TaskVisualExamplePropsType) => {
  const { taskTitle, textSize } = props;

  const theme = useSelector(themeSelector);

  const menuHorizontalStyle = useStyles(menuHorizontalStyles);
  const styles = useStyles(taskStyles);

  const [isMenuHorizontalVisible, setIsMenuHorizontalVisible] =
    useState<IsMenuHorizontalVisibleType>(false);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

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
              <View style={iconButtonStyles.icon}>
                <LinearGradient colors={taskMenuButtonGradient}>
                  <View style={menuHorizontalStyle.middleButtonContainer}>
                    <View style={commonButtonStyles.buttonContainer}>
                      <FontAwesomeIcon
                        color={theme.TEXT_COLOR}
                        icon={faPen}
                        size={ICON_SIZE_SMALL}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View style={menuHorizontalStyle.buttonWrapper}>
              <View style={iconButtonStyles.icon}>
                <LinearGradient colors={taskMenuButtonGradient}>
                  <View style={menuHorizontalStyle.rightButtonContainer}>
                    <View style={commonButtonStyles.buttonContainer}>
                      <FontAwesomeIcon
                        color={theme.TEXT_COLOR}
                        icon={faTrash}
                        size={ICON_SIZE_SMALL}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
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
          style={[styles.colorMark, { backgroundColor: TRANSPARENT }]}
        />
        <Text key={nanoid()} style={[styles.text, { fontSize: textSize }]}>
          {taskTitle}
        </Text>
        <View style={iconButtonStyles.icon}>
          <View style={commonButtonStyles.buttonContainer}>
            <FontAwesomeIcon
              color={theme.ICON_BUTTON_COLOR}
              icon={faCheck}
              size={ICON_SIZE_SMALL}
            />
          </View>
        </View>
      </MenuHorizontal>
    </View>
  );
};
