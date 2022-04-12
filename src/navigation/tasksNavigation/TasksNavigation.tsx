import {COLORS} from '@colors/colors';
import {TasksScreen} from '@components/screens/tasksScreen/TaskScreen';
import {iconSizeLarge, Done, ToDo} from '@constants/constants';
import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TopTabParamList} from '@navigation/tasksNavigation/types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const Tab = createMaterialTopTabNavigator<TopTabParamList>();

export const TasksNavigation = () => {
  const {t} = useTranslation();
  const TodoTasksScreenComponent = () => TasksScreen({isTodoScreen: true});
  const DoneTasksScreenComponent = () => TasksScreen({isTodoScreen: false});

  return (
    <Tab.Navigator
      initialRouteName={ToDo}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: COLORS.FRESH_EGGPLANT,
        tabBarInactiveTintColor: COLORS.BLACK,
        tabBarIndicatorStyle: styles.tabBarIndicator,
      })}>
      <Tab.Screen
        name={ToDo}
        component={TodoTasksScreenComponent}
        options={() => ({
          tabBarLabel: `${t('tasksScreen.TodoTasksTab')}`,
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
        name={Done}
        component={DoneTasksScreenComponent}
        options={() => ({
          tabBarLabel: `${t('tasksScreen.DoneTasksTab')}`,
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
