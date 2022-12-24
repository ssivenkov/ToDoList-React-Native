import React, { useEffect, useState } from 'react';

import { ModalMenuButton } from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import { styles } from '@components/common/modals/styles';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { RootNativeStackNavigatorParamListType } from '@navigation/rootNavigator/types';
import { WithAuthNavigator } from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '@react-navigation/native/src/types';
import { useStyles } from '@root/hooks/useStyles';
import { SignInScreen } from '@root/screens/signInScreen/SignInScreen';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { checkUserAction } from '@store/actions/userSagaActions/checkUserAction';
import { createChannelAction } from '@store/actions/userSagaActions/createChannelAction';
import { getUserDataAction } from '@store/actions/userSagaActions/getUserDataAction';
import { UserDataType } from '@store/reducers/userReducer/types';
import {
  channelIDSelector,
  errorModalMessageSelector,
  isUserDataSynchronizedSelector,
  themeSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const { Navigator, Screen } =
  createNativeStackNavigator<RootNativeStackNavigatorParamListType>();

export const RootNavigator = () => {
  const dispatch = useDispatch();

  const style = useStyles(styles);

  const { t } = useTranslation();

  const theme = useSelector(themeSelector);
  const userID = useSelector(userIDSelector);
  const isUserDataSynchronized = useSelector(isUserDataSynchronizedSelector);
  const channelID = useSelector(channelIDSelector);
  const errorModalMessage = useSelector(errorModalMessageSelector);

  const [firebaseInitializing, setFirebaseInitializing] = useState<boolean>(true);

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
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.contentWithBottomPadding}>
              <Text style={style.text}>{errorModalMessage}</Text>
            </View>
            <View style={style.buttonsContainer}>
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
            <Screen
              component={WithAuthNavigator}
              name={ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR}
              options={{ headerShown: false }}
            />
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
