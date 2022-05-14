import {COLORS} from '@colors/colors';
import {ICON_SIZE_LARGE} from '@constants/constants';
import {faCheck, faList} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from '@navigation/tasksNavigator/styles';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {t} from 'i18next';
import React from 'react';

export const tasksNavigatorOptions = {
  tabBarStyle: styles.tabBarContainer,
  tabBarItemStyle: styles.tabBarItem,
  tabBarActiveTintColor: COLORS.FRESH_EGGPLANT,
  tabBarInactiveTintColor: COLORS.BLACK,
  tabBarIndicatorStyle: styles.tabBarIndicator,
};

export const toDoScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: `${t('tasksScreen.TodoTasksTab')}`,
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
      icon={faList}
      size={ICON_SIZE_LARGE}
    />
  ),
};

export const doneScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: `${t('tasksScreen.DoneTasksTab')}`,
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
      icon={faCheck}
      size={ICON_SIZE_LARGE}
    />
  ),
};
