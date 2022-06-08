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
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {languageSelector} from '@store/selectors/userSelectors';
import i18next, {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createMaterialTopTabNavigator<TopTabParamList>();

export const TasksNavigator = () => {
  const dispatch = useDispatch();
  const languageInState = useSelector(languageSelector);
  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== languageInState) {
      dispatch(changeLanguageAction({language: languageInState}));
      setRerender(languageInState);
    }
  }, [rerender, languageInState]);

  return (
    <Navigator
      initialRouteName={TaskNavigatorScreens.TODO}
      screenOptions={tasksNavigatorOptions()}>
      <Screen
        name={TaskNavigatorScreens.TODO}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        options={{
          ...toDoScreenOptions(),
          tabBarLabel: t('tasksScreen.TodoTasksTab'),
        }}
      />
      <Screen
        name={TaskNavigatorScreens.DONE}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: false,
        }}
        options={{
          ...doneScreenOptions(),
          tabBarLabel: t('tasksScreen.DoneTasksTab'),
        }}
      />
    </Navigator>
  );
};
