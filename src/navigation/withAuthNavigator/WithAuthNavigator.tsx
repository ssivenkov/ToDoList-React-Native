import React, { useEffect, useState } from 'react';

import { Loader } from '@components/common/loader/Loader';
import { TasksNavigator } from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenOptions,
  tasksNavigatorOptions,
  withAuthNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import { styles } from '@navigation/withAuthNavigator/styles';
import {
  BottomTabParamList,
  withAuthNavigatorScreens,
} from '@navigation/withAuthNavigator/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStyles } from '@root/hooks/useStyles';
import { AccountScreen } from '@root/screens/accountScreen/AccountScreen';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import {
  accentColorSelector,
  globalLoaderSelector,
  languageSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import i18next, { changeLanguage, t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  const dispatch = useDispatch();

  const style = useStyles(styles);

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const languageInState = useSelector(languageSelector);
  const globalLoader = useSelector(globalLoaderSelector);

  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== languageInState) {
      changeLanguage(languageInState).then(() => {
        dispatch(changeLanguageAction({ language: languageInState }));
        setRerender(languageInState);
      });
    }
  }, [rerender, languageInState]);

  return (
    <>
      {globalLoader && <Loader />}
      <Navigator
        initialRouteName={withAuthNavigatorScreens.TASKS}
        screenOptions={withAuthNavigatorOptions({ style, theme, accentColor })}
      >
        <Screen
          component={TasksNavigator}
          name={withAuthNavigatorScreens.TASKS}
          options={{
            ...tasksNavigatorOptions({ style, theme, accentColor }),
            headerTitle: t('tasksScreen.Tasks'),
            tabBarLabel: t('tasksScreen.Tasks'),
          }}
        />
        <Screen
          component={AccountScreen}
          name={withAuthNavigatorScreens.ACCOUNT}
          options={{
            ...accountScreenOptions({ style, theme, accentColor }),
            headerTitle: t('accountScreen.Account'),
            tabBarLabel: t('accountScreen.Account'),
          }}
        />
      </Navigator>
    </>
  );
};
