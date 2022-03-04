import React from 'react';
import {styles} from './Styles';
import {NAVIGATION} from '../../enums/navigationEnum';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TasksScreen} from '../screens/tasksScreen/TasksScreen';
import {SignInScreen} from '../screens/signInScreen/SignInScreen';
import {Image} from 'react-native';
import {RootTabParamListType} from './Types';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import tasksList from '../../assets/images/icons/TasksList.png';
import tasksListActive from '../../assets/images/icons/TasksListActive.png';
import signIn from '../../assets/images/icons/signIn.png';
import signInActive from '../../assets/images/icons/sigInActive.png';

const RootTab = createBottomTabNavigator<RootTabParamListType>();

export const Navigation = (): ReturnComponentType => {
  return (
    <NavigationContainer>
      <RootTab.Navigator
        initialRouteName={NAVIGATION.TASKS_LIST}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            switch (route.name) {
              case NAVIGATION.TASKS_LIST:
                return focused ? (
                  <Image style={styles.tabImage} source={tasksListActive} />
                ) : (
                  <Image style={styles.tabImage} source={tasksList} />
                );
              case NAVIGATION.SIGN_IN:
                return focused ? (
                  <Image style={styles.tabImage} source={signInActive} />
                ) : (
                  <Image style={styles.tabImage} source={signIn} />
                );
              default:
                return <Image style={styles.tabImage} source={tasksList} />;
            }
          },
          headerShown: false,
          tabBarIconStyle: styles.tabImage,
          tabBarStyle: styles.tabBarContainer,
          tabBarActiveBackgroundColor: 'purple',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'gray',
        })}>
        <RootTab.Screen name={NAVIGATION.TASKS_LIST} component={TasksScreen} />
        <RootTab.Screen name={NAVIGATION.SIGN_IN} component={SignInScreen} />
      </RootTab.Navigator>
    </NavigationContainer>
  );
};
