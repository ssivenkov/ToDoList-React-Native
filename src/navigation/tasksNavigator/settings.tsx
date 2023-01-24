import React from 'react';

import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { TasksNavigatorSettingsType } from './types';

export const tasksNavigatorSettings: TasksNavigatorSettingsType = (params) => {
  const { styles, theme, accentColor } = params;

  return {
    tabBarStyle: styles.topTabBarContainer,
    tabBarItemStyle: styles.topTabBarItem,
    tabBarActiveTintColor: accentColor,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIndicatorStyle: styles.topTabIndicator,
    tabBarIconStyle: styles.topTabIconContainer,
    tabBarLabelStyle: styles.topTabTitle,
  };
};

export const toDoScreenSettings: TasksNavigatorSettingsType = (params) => {
  const { styles } = params;

  return {
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faList}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.topTabIconFocus : styles.topTabIcon}
      />
    ),
  };
};

export const doneScreenSettings: TasksNavigatorSettingsType = (params) => {
  const { styles } = params;

  return {
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faCheck}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.topTabIconFocus : styles.topTabIcon}
      />
    ),
  };
};
