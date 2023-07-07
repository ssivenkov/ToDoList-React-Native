import React, { useEffect, useState } from 'react';

import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { SIGN_IN_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterOptionScreen } from '@screens/registerOptionScreen/RegisterOptionScreen';
import { SignInOptionScreen } from '@screens/signInOptionScreen/SignInOptionScreen';
import { SignInScreen } from '@screens/signInScreen/SignInScreen';
import { SignInSelectOptionScreen } from '@screens/signInSelectOptionScreen/SignInSelectOptionScreen';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { globalLoaderSelector, languageSelector } from '@store/selectors/userSelectors';
import i18next, { changeLanguage } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { SignInStackNavigatorParamListType } from './types';

const { Navigator, Screen } =
  createNativeStackNavigator<SignInStackNavigatorParamListType>();

export const SignInNavigator = () => {
  const dispatch = useDispatch();

  const language = useSelector(languageSelector);
  const globalLoader = useSelector(globalLoaderSelector);

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
      <Navigator
        initialRouteName={SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SCREEN}
        screenOptions={{ headerShown: false }}
      >
        <Screen
          component={SignInScreen}
          name={SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SCREEN}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Screen
          component={SignInSelectOptionScreen}
          name={SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SELECT_OPTION_SCREEN}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Screen
          component={SignInOptionScreen}
          name={SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_OPTION_SCREEN}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Screen
          component={RegisterOptionScreen}
          name={SIGN_IN_NAVIGATOR_ROUTE.REGISTER_OPTION_SCREEN}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
      </Navigator>
    </>
  );
};
