import {COLORS} from '@colors/colors';
import {TasksScreen} from '@components/screens/tasksScreen/TaskScreen';
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
  const TodoTasksScreenComponent = () => TasksScreen({isTodoScreen: true});
  const DoneTasksScreenComponent = () => TasksScreen({isTodoScreen: false});

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
        component={TodoTasksScreenComponent}
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
        component={DoneTasksScreenComponent}
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
