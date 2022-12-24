import React, { useEffect, useState } from 'react';

import { TASKS_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import {
  doneScreenSettings,
  tasksNavigatorSettings,
  toDoScreenSettings,
} from '@navigation/tasksNavigator/settings';
import { styles } from '@navigation/tasksNavigator/styles';
import { TopTabParamListType } from '@navigation/tasksNavigator/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useStyles } from '@root/hooks/useStyles';
import { TasksScreen } from '@root/screens/tasksScreen/TaskScreen';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import {
  accentColorSelector,
  languageSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import i18next, { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

const { Navigator, Screen } = createMaterialTopTabNavigator<TopTabParamListType>();

export const TasksNavigator = () => {
  const dispatch = useDispatch();

  const style = useStyles(styles);

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const languageInState = useSelector(languageSelector);

  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== languageInState) {
      dispatch(changeLanguageAction({ language: languageInState }));
      setRerender(languageInState);
    }
  }, [rerender, languageInState]);

  return (
    <Navigator
      initialRouteName={TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN}
      screenOptions={tasksNavigatorSettings({ style, theme, accentColor })}
    >
      <Screen
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        name={TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN}
        options={{
          ...toDoScreenSettings({ style, theme, accentColor }),
          tabBarLabel: t('tasksScreen.TodoTasksTab'),
        }}
      />
      <Screen
        component={TasksScreen}
        initialParams={{
          isTodoScreen: false,
        }}
        name={TASKS_NAVIGATOR_ROUTE.DONE_TASKS_SCREEN}
        options={{
          ...doneScreenSettings({ style, theme, accentColor }),
          tabBarLabel: t('tasksScreen.DoneTasksTab'),
        }}
      />
    </Navigator>
  );
};
