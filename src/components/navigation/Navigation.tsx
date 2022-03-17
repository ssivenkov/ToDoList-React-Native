import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {iconSizeMedium} from '../../constants/constants';
import {NAVIGATION} from '../../enums/navigationEnum';
import {SignInScreen} from '../screens/signInScreen/signInScreen';
import {styles} from './styles';
import {TasksNavigator} from './tasksNavigation/TasksNavigator';
import {RootTabParamListType} from './types';

const RootTab = createBottomTabNavigator<RootTabParamListType>();

export const Navigation = (): ReturnComponentType => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootTab.Navigator
          initialRouteName={NAVIGATION.TASKS}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
                icon={route.name === NAVIGATION.TASKS ? faFile : faUser}
                size={iconSizeMedium}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarContainer,
            tabBarActiveBackgroundColor: 'purple',
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#123',
          })}>
          <RootTab.Screen
            name={NAVIGATION.TASKS}
            component={TasksNavigator}
            options={{}}
          />
          <RootTab.Screen name={NAVIGATION.SIGN_IN} component={SignInScreen} />
        </RootTab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
