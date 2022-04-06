import {COLORS} from '@colors/colors';
import {DoneTasksScreen} from '@components/screens/doneTaskScreen/DoneTaskScreen';
import {TodoTasksScreen} from '@components/screens/todoTaskScreen/TodoTaskScreen';
import {iconSizeLarge} from '@constants/constants';
import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const Tab = createMaterialTopTabNavigator();

export const TasksNavigation = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={`${t('tasksScreen.TodoTasksTab')}`}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: COLORS.FRESH_EGGPLANT,
        tabBarInactiveTintColor: COLORS.BLACK,
        tabBarIndicatorStyle: styles.tabBarIndicator,
      })}>
      <Tab.Screen
        name={`${t('tasksScreen.TodoTasksTab')}`}
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
        name={`${t('tasksScreen.DoneTasksTab')}`}
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
