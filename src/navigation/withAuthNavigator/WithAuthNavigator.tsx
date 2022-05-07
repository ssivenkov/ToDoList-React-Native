import {TasksNavigator} from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenOptions,
  tasksNavigatorOptions,
  withAuthNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import {BottomTabParamList} from '@navigation/withAuthNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen} from '@root/screens/accountScreen/AccountScreen';
import React from 'react';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  return (
    <Navigator
      initialRouteName={'Tasks'}
      screenOptions={withAuthNavigatorOptions}>
      <Screen
        name={'Tasks'}
        component={TasksNavigator}
        options={tasksNavigatorOptions}
      />
      <Screen
        name={'Account'}
        component={AccountScreen}
        options={accountScreenOptions}
      />
    </Navigator>
  );
};
