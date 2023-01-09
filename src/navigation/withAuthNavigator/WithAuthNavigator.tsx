import React, { useEffect, useState } from 'react';

import { Loader } from '@components/loader/Loader';
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
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import {
  accentColorSelector,
  globalLoaderSelector,
  languageSelector,
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

  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== language) {
      changeLanguage(language).then(() => {
        dispatch(changeLanguageAction({ language }));
        setRerender(language);
      });
    }
  }, [rerender, language]);

  return (
    <>
      {globalLoader && <Loader />}
      <Navigator
        initialRouteName={WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR}
        screenOptions={withAuthNavigatorOptions({ styles, theme, accentColor })}
      >
        <Screen
          component={NotepadScreen}
          name={WITH_AUTH_NAVIGATOR_ROUTE.NOTEPAD_SCREEN}
          options={{
            ...notepadScreenSettings({
              styles,
              theme,
              accentColor,
            }),
            tabBarLabel: t('notepadScreen.Notepad'),
          }}
        />
        <Screen
          component={TasksNavigator}
          name={WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR}
          options={{
            ...tasksNavigatorSettings({ styles, theme, accentColor }),
            headerTitle: t('tasksScreen.Tasks'),
            tabBarLabel: t('tasksScreen.Tasks'),
          }}
        />
        <Screen
          component={AccountScreen}
          name={WITH_AUTH_NAVIGATOR_ROUTE.ACCOUNT_SCREEN}
          options={{
            ...accountScreenSettings({ styles, theme, accentColor }),
            headerTitle: t('accountScreen.Account'),
            tabBarLabel: t('accountScreen.Account'),
          }}
        />
      </Navigator>
    </>
  );
};
