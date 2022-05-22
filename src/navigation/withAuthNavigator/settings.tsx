import {COLORS} from '@colors/colors';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {ICON_SIZE_MEDIUM} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from '@navigation/withAuthNavigator/styles';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';

export const withAuthNavigatorOptions = {
  headerShown: false,
  tabBarStyle: styles.tabBarContainer,
  tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
  tabBarActiveTintColor: COLORS.WHITE,
  tabBarInactiveTintColor: COLORS.BLACK,
  tabBarIconStyle: styles.icon,
  tabBarLabelStyle: styles.title,
};

export const tasksNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerStyle: styles.header,
  headerTitle: `${t('tasksScreen.Tasks')}`,
  headerTitleStyle: styles.headerTitleStyle,
  headerTitleAlign: 'center',
  tabBarLabel: `${t('tasksScreen.Tasks')}`,
  headerRight: () => (
    <View style={styles.buttonContainer}>
      <CreateTaskListButton />
    </View>
  ),
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
      icon={faFile}
      size={ICON_SIZE_MEDIUM}
    />
  ),
};

export const accountScreenOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerStyle: styles.header,
  headerTitle: `${t('accountScreen.Account')}`,
  headerTitleStyle: styles.headerTitleStyle,
  headerTitleAlign: 'center',
  tabBarLabel: `${t('accountScreen.Account')}`,
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
      icon={faUser}
      size={ICON_SIZE_MEDIUM}
    />
  ),
};
