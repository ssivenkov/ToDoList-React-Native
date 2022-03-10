import React from 'react';
import {styles} from './Styles';
import {NAVIGATION} from '../../enums/navigationEnum';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TasksScreen} from '../screens/tasksScreen/TasksScreen';
import {SignInScreen} from '../screens/signInScreen/SignInScreen';
import {RootTabParamListType} from './Types';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {iconSizeMedium} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const RootTab = createBottomTabNavigator<RootTabParamListType>();

export const Navigation = (): ReturnComponentType => {
  return (
    <NavigationContainer>
      <RootTab.Navigator
        initialRouteName={NAVIGATION.TASKS}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            switch (route.name) {
              case NAVIGATION.TASKS:
                return focused ? (
                  <FontAwesomeIcon
                    style={styles.tabLightIcon}
                    icon={faFile}
                    size={iconSizeMedium}
                  />
                ) : (
                  <FontAwesomeIcon icon={faFile} size={iconSizeMedium} />
                );
              case NAVIGATION.SIGN_IN:
                return focused ? (
                  <FontAwesomeIcon
                    style={styles.tabLightIcon}
                    icon={faUser}
                    size={iconSizeMedium}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size={iconSizeMedium} />
                );
              default:
                return <FontAwesomeIcon icon={faFile} size={iconSizeMedium} />;
            }
          },
          headerShown: false,
          tabBarStyle: styles.tabBarContainer,
          tabBarActiveBackgroundColor: 'purple',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#123',
        })}>
        <RootTab.Screen name={NAVIGATION.TASKS} component={TasksScreen} />
        <RootTab.Screen name={NAVIGATION.SIGN_IN} component={SignInScreen} />
      </RootTab.Navigator>
    </NavigationContainer>
  );
};
