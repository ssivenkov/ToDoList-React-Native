import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {iconSizeLarge} from '../../../constants/constants';
import {NAVIGATION_TASKS} from '../../../enums/taskListsEnum';
import {DoneTasksScreen} from './screens/DoneTaskScreen/DoneTaskScreen';
import {TodoTasksScreen} from './screens/TodoTaskScreen/TodoTaskScreen';
import {TabParamsListType} from './screens/types';
import {styles} from './styles';

const Tab = createMaterialTopTabNavigator<TabParamsListType>();

export const TasksNavigator = (): ReturnComponentType => {
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
