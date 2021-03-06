import React from 'react';

import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TasksNavigatorOptionsType } from '@navigation/tasksNavigator/types';
import { t } from 'i18next';

export const tasksNavigatorOptions: TasksNavigatorOptionsType = (params) => {
  const { style, theme, accentColor } = params;

  return {
    tabBarStyle: style.tabBarContainer,
    tabBarItemStyle: style.tabBarItem,
    tabBarActiveTintColor: accentColor,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIndicatorStyle: style.tabBarIndicator,
    tabBarIconStyle: style.icon,
    tabBarLabelStyle: style.title,
  };
};

export const toDoScreenOptions: TasksNavigatorOptionsType = (params) => {
  const { style } = params;

  return {
    tabBarLabel: t('tasksScreen.TodoTasksTab'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faList}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? style.tabFocusIcon : style.tabIcon}
      />
    ),
  };
};

export const doneScreenOptions: TasksNavigatorOptionsType = (params) => {
  const { style } = params;

  return {
    tabBarLabel: t('tasksScreen.DoneTasksTab'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faCheck}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? style.tabFocusIcon : style.tabIcon}
      />
    ),
  };
};
