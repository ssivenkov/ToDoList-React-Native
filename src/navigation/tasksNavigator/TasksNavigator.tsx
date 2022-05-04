import {COLORS} from '@colors/colors';
import {ICON_SIZE_LARGE} from '@constants/constants';
import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TopTabParamList} from '@navigation/tasksNavigator/types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TasksScreen} from '@root/screens/tasksScreen/TaskScreen';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const {Navigator, Screen} = createMaterialTopTabNavigator<TopTabParamList>();

export const TasksNavigator = () => {
  const {t} = useTranslation();

  return (
    <Navigator
      initialRouteName={'ToDo'}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: COLORS.FRESH_EGGPLANT,
        tabBarInactiveTintColor: COLORS.BLACK,
        tabBarIndicatorStyle: styles.tabBarIndicator,
      })}>
      <Screen
        name={'ToDo'}
        component={() => TasksScreen(true)}
        options={() => ({
          tabBarLabel: `${t('tasksScreen.TodoTasksTab')}`,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faListCheck}
              size={ICON_SIZE_LARGE}
            />
          ),
        })}
      />
      <Screen
        name={'Done'}
        component={() => TasksScreen(false)}
        options={() => ({
          tabBarLabel: `${t('tasksScreen.DoneTasksTab')}`,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faCheck}
              size={ICON_SIZE_LARGE}
            />
          ),
        })}
      />
    </Navigator>
  );
};
