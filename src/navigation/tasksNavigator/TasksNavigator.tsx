import React, { useEffect, useState } from 'react';

import { TASKS_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { useStyles } from '@hooks/useStyles';
import {
  doneScreenSettings,
  tasksNavigatorSettings,
  toDoScreenSettings,
} from '@navigation/tasksNavigator/settings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TasksScreen } from '@screens/tasksScreen/TaskScreen';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import {
  accentColorSelector,
  languageSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import i18next, { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { tasksNavigatorStyles } from './styles';
import { TopTabParamListType } from './types';

const { Navigator, Screen } = createMaterialTopTabNavigator<TopTabParamListType>();

export const TasksNavigator = () => {
  const dispatch = useDispatch();

  const styles = useStyles(tasksNavigatorStyles);

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const language = useSelector(languageSelector);

  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== language) {
      dispatch(changeLanguageAction({ language }));
      setRerender(language);
    }
  }, [rerender, language]);

  return (
    <Navigator
      initialRouteName={TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN}
      screenOptions={tasksNavigatorSettings({ styles, theme, accentColor })}
    >
      <Screen
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        name={TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN}
        options={{
          ...toDoScreenSettings({ styles, theme, accentColor }),
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
          ...doneScreenSettings({ styles, theme, accentColor }),
          tabBarLabel: t('tasksScreen.DoneTasksTab'),
        }}
      />
    </Navigator>
  );
};
