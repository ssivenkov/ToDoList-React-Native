import React from 'react';

import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { WithAuthNavigatorScreenSettingsType } from '@navigation/withAuthNavigator/types';
import { CreateTaskListButton } from '@screens/tasksScreen/buttons/createTaskListButton/CreateTaskListButton';
import { t } from 'i18next';
import { View } from 'react-native';

export const withAuthNavigatorOptions: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles, theme, accentColor } = params;

  return {
    headerShown: false,
    tabBarStyle: styles.tabBarContainer,
    tabBarActiveTintColor: accentColor,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIconStyle: styles.icon,
    tabBarLabelStyle: styles.title,
  };
};

export const notepadScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: false,
    tabBarLabel: t('notepadScreen.Notepad'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faFileAlt}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.tabFocusIcon : styles.tabIcon}
      />
    ),
  };
};

export const tasksNavigatorSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: true,
    headerStyle: styles.header,
    headerTitle: t('tasksScreen.Tasks'),
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    tabBarLabel: t('tasksScreen.Tasks'),
    headerRight: () => (
      <View style={styles.rightButtonContainer}>
        <CreateTaskListButton />
      </View>
    ),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faList}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.tabFocusIcon : styles.tabIcon}
      />
    ),
  };
};

export const accountScreenSettings: WithAuthNavigatorScreenSettingsType = (params) => {
  const { styles } = params;

  return {
    headerShown: true,
    headerStyle: styles.header,
    headerTitle: t('accountScreen.Account'),
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    tabBarLabel: t('accountScreen.Account'),
    tabBarIcon: ({ focused }) => (
      <FontAwesomeIcon
        icon={faUser}
        size={ICON_SIZE_HALF_MEDIUM}
        style={focused ? styles.tabFocusIcon : styles.tabIcon}
      />
    ),
  };
};
