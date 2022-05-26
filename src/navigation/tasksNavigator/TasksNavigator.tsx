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
import {languageSelector, themeSelector} from '@store/selectors/userSelectors';
import i18next, {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const {Navigator, Screen} = createMaterialTopTabNavigator<TopTabParamList>();

export const TasksNavigator = () => {
  const languageInState = useSelector(languageSelector);
  const theme = useSelector(themeSelector);
  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== languageInState) {
      setRerender(languageInState);
    }
  }, [rerender]);

  return (
    <Navigator
      initialRouteName={TaskNavigatorScreens.TODO}
      sceneContainerStyle={{backgroundColor: theme.BACKGROUND_COLOR}}
      screenOptions={tasksNavigatorOptions}>
      <Screen
        name={TaskNavigatorScreens.TODO}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        options={{
          ...toDoScreenOptions,
          tabBarLabel: `${t('tasksScreen.TodoTasksTab')}`,
        }}
      />
      <Screen
        name={TaskNavigatorScreens.DONE}
        component={TasksScreen}
        initialParams={{
          isTodoScreen: false,
        }}
        options={{
          ...doneScreenOptions,
          tabBarLabel: `${t('tasksScreen.DoneTasksTab')}`,
        }}
      />
    </Navigator>
  );
};
