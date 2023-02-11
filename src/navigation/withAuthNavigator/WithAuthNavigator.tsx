import React, { useEffect, useState } from 'react';

import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { SnackBar } from '@components/snackBar/SnackBar';
import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { useStyles } from '@hooks/useStyles';
import { TasksNavigator } from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenSettings,
  notepadScreenSettings,
  tasksNavigatorSettings,
  withAuthNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen } from '@screens/accountScreen/AccountScreen';
import { NotepadScreen } from '@screens/notepadScreen/NotepadScreen';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import {
  accentColorSelector,
  globalLoaderSelector,
  languageSelector,
  lastRouteSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import i18next, { changeLanguage, t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { withAuthNavigatorStyles } from './styles';
import { BottomTabParamList } from './types';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  const dispatch = useDispatch();

  const styles = useStyles(withAuthNavigatorStyles);

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const language = useSelector(languageSelector);
  const globalLoader = useSelector(globalLoaderSelector);
  const lastRoute = useSelector(lastRouteSelector);

  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== language) {
      changeLanguage(language).then(() => {
        dispatch(setLanguageAction({ language }));
        setRerender(language);
      });
    }
  }, [rerender, language]);

  return (
    <>
      {globalLoader && <PurpleLoader />}
      <SnackBar />
      <Navigator
        initialRouteName={lastRoute}
        screenOptions={withAuthNavigatorOptions({ accentColor, styles, theme })}
      >
        <Screen
          component={NotepadScreen}
          name={WITH_AUTH_NAVIGATOR_ROUTE.NOTEPAD_SCREEN}
          options={{
            ...notepadScreenSettings({
              accentColor,
              styles,
              theme,
            }),
            tabBarLabel: t('notepadScreen.HeaderTitle'),
          }}
        />
        <Screen
          component={TasksNavigator}
          name={WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR}
          options={{
            ...tasksNavigatorSettings({ accentColor, styles, theme }),
            headerTitle: t('tasksScreen.HeaderTitle'),
            tabBarLabel: t('tasksScreen.HeaderTitle'),
          }}
        />
        <Screen
          component={AccountScreen}
          name={WITH_AUTH_NAVIGATOR_ROUTE.ACCOUNT_SCREEN}
          options={{
            ...accountScreenSettings({ accentColor, styles, theme }),
            headerTitle: t('accountScreen.HeaderTitle'),
            tabBarLabel: t('accountScreen.HeaderTitle'),
          }}
        />
      </Navigator>
    </>
  );
};
