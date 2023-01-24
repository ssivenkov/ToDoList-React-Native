import React from 'react';

import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { WithAuthNavigatorScreenSettingsType } from '@navigation/withAuthNavigator/types';
import { CreateTaskListButton } from '@screens/tasksScreen/buttons/createTaskListButton/CreateTaskListButton';

export const withAuthNavigatorOptions: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles, theme, accentColor } = params;

  return {
    headerShown: false,
    tabBarStyle: styles.topTabBarContainer,
    tabBarActiveTintColor: accentColor,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIconStyle: styles.bottomTabBarIcon,
    tabBarLabelStyle: styles.bottomTabBarTitle,
  };
};

export const notepadScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faFileAlt}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.topTabIconFocus : styles.topTabIcon}
      />
    ),
  };
};

export const tasksNavigatorSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: true,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerRight: () => <CreateTaskListButton />,
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faList}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.topTabIconFocus : styles.topTabIcon}
      />
    ),
  };
};

export const accountScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: true,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faUser}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.topTabIconFocus : styles.topTabIcon}
      />
    ),
  };
};
