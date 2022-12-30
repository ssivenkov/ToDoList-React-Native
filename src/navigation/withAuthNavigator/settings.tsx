import React from 'react';

import { CreateTaskListButton } from '@components/buttons/createTaskListButton/CreateTaskListButton';
import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faFile, faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { WithAuthNavigatorScreenSettingsType } from '@navigation/withAuthNavigator/types';
import { t } from 'i18next';
import { View } from 'react-native';

export const withAuthNavigatorOptions: WithAuthNavigatorScreenSettingsType = (params) => {
  const { style, theme, accentColor } = params;

  return {
    headerShown: false,
    tabBarStyle: style.tabBarContainer,
    tabBarActiveTintColor: accentColor,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIconStyle: style.icon,
    tabBarLabelStyle: style.title,
  };
};

export const notepadScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { style } = params;

  return {
    headerShown: false,
    tabBarLabel: t('notepadScreen.notepad'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faFileAlt}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? style.tabFocusIcon : style.tabIcon}
      />
    ),
  };
};

export const tasksNavigatorSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { style } = params;

  return {
    headerShown: true,
    headerStyle: style.header,
    headerTitle: t('tasksScreen.Tasks'),
    headerTitleStyle: style.headerTitle,
    headerTitleAlign: 'center',
    tabBarLabel: t('tasksScreen.Tasks'),
    headerRight: () => (
      <View style={style.rightButtonContainer}>
        <CreateTaskListButton />
      </View>
    ),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faFile}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? style.tabFocusIcon : style.tabIcon}
      />
    ),
  };
};

export const accountScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { style } = params;

  return {
    headerShown: true,
    headerStyle: style.header,
    headerTitle: t('accountScreen.Account'),
    headerTitleStyle: style.headerTitle,
    headerTitleAlign: 'center',
    tabBarLabel: t('accountScreen.Account'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faUser}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? style.tabFocusIcon : style.tabIcon}
      />
    ),
  };
};
