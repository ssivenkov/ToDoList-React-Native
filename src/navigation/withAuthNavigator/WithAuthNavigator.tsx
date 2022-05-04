import {TasksNavigator} from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenOptions,
  withAuthNavigatorOptions,
  tasksNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import {BottomTabParamList} from '@navigation/withAuthNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen} from '@root/screens/accountScreen/AccountScreen';
import {syncUserTaskListsAction} from '@store/actions/authSagaActions/syncUserTaskListsAction';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncUserTaskListsAction());
  }, []);

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
