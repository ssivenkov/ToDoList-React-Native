import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ICON_SIZE_SMALL } from '@constants/constants';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { themeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { SimpleCollapsingButtonPropsType } from './types';

export const SimpleCollapsingButton = (props: SimpleCollapsingButtonPropsType) => {
  const { isCollapsed, setIsCollapsed } = props;

  const theme = useSelector(themeSelector);

  const setTodoTaskListUnCollapsed = () => {
    setIsCollapsed(false);
  };

  const setTodoTaskListCollapsed = () => {
    setIsCollapsed(true);
  };

  if (isCollapsed) {
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
  } else {
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
};
