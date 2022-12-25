import React, { useEffect, useState } from 'react';

import { ModalMenuButton } from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import { styles } from '@components/common/modals/styles';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { nativeStackExtraScreenSettings } from '@navigation/rootNavigator/settings';
import { RootNativeStackNavigatorParamListType } from '@navigation/rootNavigator/types';
import { WithAuthNavigator } from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '@react-navigation/native/src/types';
import { useStyles } from '@root/hooks/useStyles';
import { ContactTheAuthorScreen } from '@root/screens/contactTheAuthorScreen/ContactTheAuthorScreen';
import { SignInScreen } from '@root/screens/signInScreen/SignInScreen';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import { checkUserAction } from '@store/actions/userSagaActions/checkUserAction';
import { createChannelAction } from '@store/actions/userSagaActions/createChannelAction';
import { getUserDataAction } from '@store/actions/userSagaActions/getUserDataAction';
import { UserDataType } from '@store/reducers/userReducer/types';
import {
  accentColorSelector,
  channelIDSelector,
  errorModalMessageSelector,
  isUserDataSynchronizedSelector,
  languageSelector,
  themeSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import i18next, { t } from 'i18next';
import { Modal, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const { Navigator, Screen } =
  createNativeStackNavigator<RootNativeStackNavigatorParamListType>();

export const RootNavigator = () => {
  const dispatch = useDispatch();

  const modalStyles = useStyles(styles);

  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const userID = useSelector(userIDSelector);
  const isUserDataSynchronized = useSelector(isUserDataSynchronizedSelector);
  const channelID = useSelector(channelIDSelector);
  const errorModalMessage = useSelector(errorModalMessageSelector);
  const language = useSelector(languageSelector);

  const [firebaseInitializing, setFirebaseInitializing] = useState<boolean>(true);
  const [rerender, setRerender] = useState<string>('');

  const backgroundTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.BACKGROUND_COLOR,
    },
  };

  const onCloseErrorModalPress = (): void => {
    dispatch(setModalErrorMessageAction({ errorModalMessage: '' }));
  };

  useEffect(() => {
    if (userID && !isUserDataSynchronized) {
      dispatch(checkUserAction());
    }
  }, [userID]);

  useEffect(() => {
    const onAuthStateChanged = (userData: UserDataType) => {
      dispatch(getUserDataAction({ userData }));

      if (firebaseInitializing) {
        setFirebaseInitializing(false);
      }
    };

    if (!channelID) {
      dispatch(createChannelAction());
    }

    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });

    // subscriber
    return auth().onAuthStateChanged((user) => onAuthStateChanged(user));
  }, []);

  // need for rerender with correct translations for navigator
  useEffect(() => {
    if (i18next.language !== language) {
      dispatch(changeLanguageAction({ language }));
      setRerender(language);
    }
  }, [rerender, language]);

  if (firebaseInitializing) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Modal
        onRequestClose={onCloseErrorModalPress}
        transparent={true}
        visible={!!errorModalMessage}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.contentWithBottomPadding}>
              <Text style={modalStyles.text}>{errorModalMessage}</Text>
            </View>
            <View style={modalStyles.buttonsContainer}>
              <ModalMenuButton
                leftRounding={true}
                onPress={onCloseErrorModalPress}
                rightRounding={true}
                title={t('common.Close')}
              />
            </View>
          </View>
        </View>
      </Modal>

      <NavigationContainer theme={backgroundTheme}>
        <Navigator>
          {!userID ? (
            <Screen
              component={SignInScreen}
              name={ROOT_NAVIGATOR_ROUTE.SIGN_IN_SCREEN}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Screen
                component={WithAuthNavigator}
                name={ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR}
                options={{ headerShown: false }}
              />
              <Screen
                component={ContactTheAuthorScreen}
                name={ROOT_NAVIGATOR_ROUTE.CONTACT_THE_AUTHOR_SCREEN}
                options={{
                  ...nativeStackExtraScreenSettings({
                    accentColor,
                  }),
                  title: t('contactTheAuthorScreen.HeaderTitle'),
                }}
              />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
