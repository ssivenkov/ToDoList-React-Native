import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { useSelector } from 'react-redux';

import { CreateTaskButtonPropsType } from './types';

export const CreateTaskButton = (props: CreateTaskButtonPropsType) => {
  const navigation = useNavigation();

  const theme = useSelector(themeSelector);

  const navigateToAddTaskScreen = () => {
    navigation.navigate(ROOT_NAVIGATOR_ROUTE.ADD_TASK_SCREEN, props);
  };

  return (
    <IconButton
      icon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={theme.ICON_BUTTON_COLOR}
            icon={faPlus}
            size={ICON_SIZE_SMALL}
          />
        </View>
      }
      onPress={navigateToAddTaskScreen}
    />
  );
};
