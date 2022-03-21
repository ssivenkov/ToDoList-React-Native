import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from '../colors/colors';
import {CreateTaskListButton} from '../components/buttons/createTaskListButton/CreateTaskListButton';
import {SignInScreen} from '../components/screens/signInScreen/SignInScreen';
import {iconSizeMedium} from '../constants/constants';
import {NAVIGATION} from '../enums/navigationEnum';
import {styles} from './styles';
import {TasksNavigation} from './tasksNavigation/TasksNavigation';
import {RootTabParamListType} from './types';

const RootTab = createBottomTabNavigator<RootTabParamListType>();

export const Navigation = (): ReturnComponentType => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootTab.Navigator
          initialRouteName={NAVIGATION.TASKS}
          screenOptions={({route}) => ({
            headerRight: () => {
              if (route.name === NAVIGATION.TASKS) {
                return (
                  <View style={styles.buttonContainer}>
                    <CreateTaskListButton />
                  </View>
                );
              }
            },
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitleStyle,
            tabBarStyle: styles.tabBarContainer,
            tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
            tabBarActiveTintColor: COLORS.WHITE,
            tabBarInactiveTintColor: COLORS.BLACK,
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: styles.title,
          })}>
          <RootTab.Screen
            name={NAVIGATION.TASKS}
            component={TasksNavigation}
            options={() => ({
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon
                  style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
                  icon={faFile}
                  size={iconSizeMedium}
                />
              ),
            })}
          />
          <RootTab.Screen
            name={NAVIGATION.SIGN_IN}
            component={SignInScreen}
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
        </RootTab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
