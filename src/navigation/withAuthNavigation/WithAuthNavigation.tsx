import {COLORS} from '@colors/colors';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {AccountScreen} from '@components/screens/accountScreen/AccountScreen';
import {iconSizeMedium} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigation} from '@navigation/tasksNavigation/TasksNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {styles} from './styles';

export const WithAuthNavigation = () => {
  const BottomNavigator = createBottomTabNavigator();
  const {t} = useTranslation();
  return (
    <BottomNavigator.Navigator
      initialRouteName={`${t('tasksScreen.Tasks')}`}
      screenOptions={() => ({
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: styles.tabBarContainer,
        tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
        tabBarActiveTintColor: COLORS.WHITE,
        tabBarInactiveTintColor: COLORS.BLACK,
        tabBarIconStyle: styles.icon,
        tabBarLabelStyle: styles.title,
      })}>
      <BottomNavigator.Screen
        name={`${t('tasksScreen.Tasks')}`}
        component={TasksNavigation}
        options={() => ({
          headerRight: () => {
            return (
              <View style={styles.buttonContainer}>
                <CreateTaskListButton />
              </View>
            );
          },
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faFile}
              size={iconSizeMedium}
            />
          ),
        })}
      />
      <BottomNavigator.Screen
        name={`${t('accountScreen.Account')}`}
        component={AccountScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faUser}
              size={iconSizeMedium}
            />
          ),
        })}
      />
    </BottomNavigator.Navigator>
  );
};
