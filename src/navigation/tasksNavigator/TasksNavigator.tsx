import React, { useEffect, useState } from 'react';

import {
  doneScreenOptions,
  tasksNavigatorOptions,
  toDoScreenOptions,
} from '@navigation/tasksNavigator/settings';
import { styles } from '@navigation/tasksNavigator/styles';
import { TaskNavigatorScreens, TopTabParamList } from '@navigation/tasksNavigator/types';
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

const { Navigator, Screen } = createMaterialTopTabNavigator<TopTabParamList>();

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
      initialRouteName={TaskNavigatorScreens.TODO}
      screenOptions={tasksNavigatorOptions({ style, theme, accentColor })}
    >
      <Screen
        component={TasksScreen}
        initialParams={{
          isTodoScreen: true,
        }}
        name={TaskNavigatorScreens.TODO}
        options={{
          ...toDoScreenOptions({ style, theme, accentColor }),
          tabBarLabel: t('tasksScreen.TodoTasksTab'),
        }}
      />
      <Screen
        component={TasksScreen}
        initialParams={{
          isTodoScreen: false,
        }}
        name={TaskNavigatorScreens.DONE}
        options={{
          ...doneScreenOptions({ style, theme, accentColor }),
          tabBarLabel: t('tasksScreen.DoneTasksTab'),
        }}
      />
    </Navigator>
  );
};
