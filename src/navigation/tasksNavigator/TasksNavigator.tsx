import {
  doneScreenOptions,
  tasksNavigatorOptions,
  toDoScreenOptions,
} from '@navigation/tasksNavigator/settings';
import {
  TaskNavigatorScreens,
  TopTabParamList,
} from '@navigation/tasksNavigator/types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TasksScreen} from '@root/screens/tasksScreen/TaskScreen';
import React from 'react';

const {Navigator, Screen} = createMaterialTopTabNavigator<TopTabParamList>();

export const TasksNavigator = () => {
  return (
    <Navigator
      initialRouteName={TaskNavigatorScreens.TODO}
      screenOptions={tasksNavigatorOptions}>
      <Screen
        name={TaskNavigatorScreens.TODO}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        options={toDoScreenOptions}
      />
      <Screen
        name={TaskNavigatorScreens.DONE}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: false,
        }}
        options={doneScreenOptions}
      />
    </Navigator>
  );
};
