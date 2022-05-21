import {TasksNavigator} from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenOptions,
  tasksNavigatorOptions,
  withAuthNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import {
  BottomTabParamList,
  withAuthNavigatorScreens,
} from '@navigation/withAuthNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen} from '@root/screens/accountScreen/AccountScreen';
import React from 'react';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  return (
    <Navigator
      initialRouteName={withAuthNavigatorScreens.TASKS}
      screenOptions={withAuthNavigatorOptions}>
      <Screen
        name={withAuthNavigatorScreens.TASKS}
        component={TasksNavigator}
        options={tasksNavigatorOptions}
      />
      <Screen
        name={withAuthNavigatorScreens.ACCOUNT}
        component={AccountScreen}
        options={accountScreenOptions}
      />
    </Navigator>
  );
};
