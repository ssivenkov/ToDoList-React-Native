import React from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { waitCloseTaskHorizontalMenuAction } from '@store/actions/tasksSagaActions/tasksSagasActions/waitCloseTaskHorizontalMenuAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskTitleButtonPropsType } from './types';

export const EditTaskButton = (props: EditTaskTitleButtonPropsType) => {
  const {
    colorMark,
    isTodo,
    oldTaskTitle,
    taskID,
    taskListID,
    setIsMenuHorizontalVisible,
  } = props;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const theme = useSelector(themeSelector);

  const menuHorizontalStyle = useStyles(menuHorizontalStyles);

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const navigateToEditTaskScreen = () => {
    dispatch(waitCloseTaskHorizontalMenuAction({ setIsMenuHorizontalVisible }));

    navigation.navigate(ROOT_NAVIGATOR_ROUTE.EDIT_TASK_SCREEN, {
      colorMark,
      isTodo,
      oldTaskTitle,
      taskID,
      taskListID,
    });
  };

  return (
    <IconButton
      icon={
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
      }
      onPress={navigateToEditTaskScreen}
    />
  );
};
