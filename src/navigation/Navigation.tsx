import {ModalMenuButton} from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import {styles} from '@components/common/modals/styles';
import {RootStackParamList, RootStackScreens} from '@navigation/types';
import {WithAuthNavigator} from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Theme} from '@react-navigation/native/src/types';
import {GoogleWebClientId} from '@root/api/config';
import {useStyles} from '@root/hooks/useStyles';
import {SignInScreen} from '@root/screens/signInScreen/SignInScreen';
import {setModalErrorMessageAction} from '@store/actions/userReducerActions/setModalErrorMessageAction';
import {checkUserAction} from '@store/actions/userSagaActions/checkUserAction';
import {createChannelAction} from '@store/actions/userSagaActions/createChannelAction';
import {getUserDataAction} from '@store/actions/userSagaActions/getUserDataAction';
import {UserDataType} from '@store/reducers/userReducer/types';
import {
  channelIDSelector,
  errorModalMessageSelector,
  themeSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const userID = useSelector(userIDSelector);
  const channelID = useSelector(channelIDSelector);
  const {t} = useTranslation();
  const style = useStyles(styles);

  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const errorModalMessage = useSelector(errorModalMessageSelector);

  const backgroundTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.BACKGROUND_COLOR,
    },
  };

  const onCloseErrorModalPress = (): void => {
    dispatch(setModalErrorMessageAction({errorModalMessage: ''}));
  };

  const onAuthStateChanged = (userData: UserDataType) => {
    dispatch(getUserDataAction({userData}));

    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  useEffect(() => {
    if (userID) dispatch(checkUserAction());
  }, [userID]);

  useEffect(() => {
    if (!channelID) dispatch(createChannelAction());

    GoogleSignin.configure({
      webClientId: GoogleWebClientId,
    });

    // subscriber
    return auth().onAuthStateChanged((user) => onAuthStateChanged(user));
  }, []);

  if (firebaseInitializing) return null;

  return (
    <SafeAreaProvider>
      <Modal
        transparent
        visible={!!errorModalMessage}
        onRequestClose={onCloseErrorModalPress}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.content}>
              <Text style={style.text}>{errorModalMessage}</Text>
            </View>
            <View style={style.buttonsContainer}>
              <ModalMenuButton
                onPress={onCloseErrorModalPress}
                title={t('common.Close')}
                leftRounding={true}
                rightRounding={true}
              />
            </View>
          </View>
        </View>
      </Modal>

      <NavigationContainer theme={backgroundTheme}>
        <Navigator>
          {userID ? (
            <Screen
              name={RootStackScreens.WITH_AUTH}
              component={WithAuthNavigator}
              options={{headerShown: false}}
            />
          ) : (
            <Screen
              name={RootStackScreens.SIGN_IN}
              component={SignInScreen}
              options={{headerShown: false}}
            />
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
