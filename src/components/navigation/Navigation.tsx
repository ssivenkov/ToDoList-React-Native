import React from 'react';
import {NAVIGATION} from '../../enums/navigationEnum';
import {NavigationContainer} from '@react-navigation/native';
import {Tasks} from '../screens/tasks/Tasks';
import {styles} from './Styles';
import {Image} from 'react-native';
import {RootTabParamListType} from './Types';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tasksImage from '../../assets/images/tasksTabIcon.png';
import doneTasksImage from '../../assets/images/doneTasksTabIcon.png';
import {DoneTasks} from '../screens/doneTasks/DoneTasks';

const RootTab = createBottomTabNavigator<RootTabParamListType>();

export const Navigation = (): ReturnComponentType => {
  return (
    <NavigationContainer>
      <RootTab.Navigator
        initialRouteName={NAVIGATION.TASKS}
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            switch (route.name) {
              case NAVIGATION.TASKS:
                return <Image style={styles.tabImage} source={tasksImage} />;
              case NAVIGATION.DONE_TASKS:
                return (
                  <Image style={styles.tabImage} source={doneTasksImage} />
                );
              default:
                return <Image style={styles.tabImage} source={tasksImage} />;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <RootTab.Screen name={NAVIGATION.TASKS} component={Tasks} />
        <RootTab.Screen name={NAVIGATION.DONE_TASKS} component={DoneTasks} />
      </RootTab.Navigator>
    </NavigationContainer>
  );
};
