import {
  doneScreenOptions,
  tasksNavigatorOptions,
  toDoScreenOptions,
} from '@navigation/tasksNavigator/settings';
import {TopTabParamList} from '@navigation/tasksNavigator/types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TasksScreen} from '@root/screens/tasksScreen/TaskScreen';
import React from 'react';

const {Navigator, Screen} = createMaterialTopTabNavigator<TopTabParamList>();

const createTasksScreenComponent = (isTodoScreen: boolean) =>
  function TasksScreenComponent() {
    return <TasksScreen isTodoScreen={isTodoScreen} />;
  };

export const TasksNavigator = () => {
  return (
    <Navigator initialRouteName={'ToDo'} screenOptions={tasksNavigatorOptions}>
      <Screen
        name={'ToDo'}
        component={createTasksScreenComponent(true)}
        options={toDoScreenOptions}
      />
      <Screen
        name={'Done'}
        component={createTasksScreenComponent(false)}
        options={doneScreenOptions}
      />
    </Navigator>
  );
};
