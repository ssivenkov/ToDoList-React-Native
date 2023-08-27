import React, { useEffect, useState } from 'react';

import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { modalStyles } from '@components/modals/modalStyles';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { useStyles } from '@hooks/useStyles';
import { SignInNavigator } from '@navigation/signInNavigator/SignInNavigator';
import { WithAuthNavigator } from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '@react-navigation/native/src/types';
import { AddTaskScreen } from '@screens/addTaskScreen/AddTaskScreen';
import { AdjustTextSizesScreen } from '@screens/adjustTextSizesScreen/AdjustTextSizesScreen';
import { ContactTheAuthorScreen } from '@screens/contactTheAuthorScreen/ContactTheAuthorScreen';
import { EditTaskScreen } from '@screens/editTaskScreen/EditTaskScreen';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { checkUserAction } from '@store/actions/userSagaActions/checkUserAction';
import { createChannelAction } from '@store/actions/userSagaActions/createChannelAction';
import { getUserDataAction } from '@store/actions/userSagaActions/getUserDataAction';
import { UserDataType } from '@store/reducers/userReducer/types';
import {
  channelIDSelector,
  modalMessageSelector,
  isUserDataSynchronizedSelector,
  languageSelector,
  themeSelector,
  userIDSelector,
  modalWindowTextSizeSelector,
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
  const modalMessage = useSelector(modalMessageSelector);
  const language = useSelector(languageSelector);
  const modalWindowTextSize = useSelector(modalWindowTextSizeSelector);

  const [firebaseInitializing, setFirebaseInitializing] = useState<boolean>(true);
  const [rerender, setRerender] = useState<string>('');

  const backgroundTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.BACKGROUND_COLOR,
    },
  };

  const onCloseModalPress = () => {
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
        onRequestClose={onCloseModalPress}
        transparent={true}
        visible={!!modalMessage}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.text, { fontSize: modalWindowTextSize }]}>
                {modalMessage}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <ModalMenuButton onPress={onCloseModalPress} title={t('common.Close')} />
            </View>
          </View>
        </View>
      </Modal>

      <NavigationContainer theme={backgroundTheme}>
        <Navigator>
          {!userID ? (
            <Screen
              component={SignInNavigator}
              name={ROOT_NAVIGATOR_ROUTE.SIGN_IN_NAVIGATOR}
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
                component={AdjustTextSizesScreen}
                name={ROOT_NAVIGATOR_ROUTE.ADJUST_TEXT_SIZES_SCREEN}
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
