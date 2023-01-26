import React, { useEffect, useState } from 'react';

import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { modalStyles } from '@components/modals/modalStyles';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { useStyles } from '@hooks/useStyles';
import { WithAuthNavigator } from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '@react-navigation/native/src/types';
import { AddTaskScreen } from '@screens/addTaskScreen/AddTaskScreen';
import { ContactTheAuthorScreen } from '@screens/contactTheAuthorScreen/ContactTheAuthorScreen';
import { EditTaskScreen } from '@screens/editTaskScreen/EditTaskScreen';
import { SignInScreen } from '@screens/signInScreen/SignInScreen';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { checkUserAction } from '@store/actions/userSagaActions/checkUserAction';
import { createChannelAction } from '@store/actions/userSagaActions/createChannelAction';
import { getUserDataAction } from '@store/actions/userSagaActions/getUserDataAction';
import { UserDataType } from '@store/reducers/userReducer/types';
import {
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

import { RootNativeStackNavigatorParamListType } from './types';

const { Navigator, Screen } =
  createNativeStackNavigator<RootNativeStackNavigatorParamListType>();

export const RootNavigator = () => {
  const dispatch = useDispatch();

  const styles = useStyles(modalStyles);

  const theme = useSelector(themeSelector);
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

  const onCloseErrorModalPress = () => {
    dispatch(setModalMessageAction({ modalMessage: '' }));
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
      dispatch(setLanguageAction({ language }));
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.text}>{errorModalMessage}</Text>
            </View>
            <View style={styles.buttonsContainer}>
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
                options={{ headerShown: false }}
              />
              <Screen
                component={AddTaskScreen}
                name={ROOT_NAVIGATOR_ROUTE.ADD_TASK_SCREEN}
                options={{ headerShown: false }}
              />
              <Screen
                component={EditTaskScreen}
                name={ROOT_NAVIGATOR_ROUTE.EDIT_TASK_SCREEN}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
