import {TasksNavigator} from '@navigation/tasksNavigator/TasksNavigator';
import {
  accountScreenOptions,
  tasksNavigatorOptions,
  withAuthNavigatorOptions,
} from '@navigation/withAuthNavigator/settings';
import {
  BottomTabParamList,
  withAuthNavigatorScreens,
} from '@navigation/withAuthNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen} from '@root/screens/accountScreen/AccountScreen';
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {languageSelector, themeSelector} from '@store/selectors/userSelectors';
import i18next, {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  const dispatch = useDispatch();
  const languageInState = useSelector(languageSelector);
  const theme = useSelector(themeSelector);
  const [rerender, setRerender] = useState<string>('');

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== languageInState) {
      dispatch(changeLanguageAction({language: languageInState}));
      setRerender(languageInState);
    }
  }, [rerender]);

  return (
    <Navigator
      initialRouteName={withAuthNavigatorScreens.TASKS}
      sceneContainerStyle={{backgroundColor: theme.BACKGROUND_COLOR}}
      screenOptions={withAuthNavigatorOptions()}>
      <Screen
        name={withAuthNavigatorScreens.TASKS}
        component={TasksNavigator}
        options={{
          ...tasksNavigatorOptions(),
          headerTitle: `${t('tasksScreen.Tasks')}`,
          tabBarLabel: `${t('tasksScreen.Tasks')}`,
        }}
      />
      <Screen
        name={withAuthNavigatorScreens.ACCOUNT}
        component={AccountScreen}
        options={{
          ...accountScreenOptions(),
          headerTitle: `${t('accountScreen.Account')}`,
          tabBarLabel: `${t('accountScreen.Account')}`,
        }}
      />
    </Navigator>
  );
};
