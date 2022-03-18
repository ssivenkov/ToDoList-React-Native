import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React from 'react';
import {DoneTasksScreen} from '../../components/screens/doneTaskScreen/DoneTaskScreen';
import {TodoTasksScreen} from '../../components/screens/todoTaskScreen/TodoTaskScreen';
import {iconSizeLarge} from '../../constants/constants';
import {NAVIGATION_TASKS} from '../../enums/taskListsEnum';
import {styles} from './styles';
import {TabParamsListType} from './types';

const Tab = createMaterialTopTabNavigator<TabParamsListType>();

export const TasksNavigation = (): ReturnComponentType => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_TASKS.TASKS}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: '#000',
        tabBarIndicatorStyle: styles.tabBarIndicator,
      })}>
      <Tab.Screen
        name={NAVIGATION_TASKS.TASKS}
        component={TodoTasksScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faListCheck}
              size={iconSizeLarge}
            />
          ),
        })}
      />
      <Tab.Screen
        name={NAVIGATION_TASKS.DONE_TASKS}
        component={DoneTasksScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faCheck}
              size={iconSizeLarge}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
