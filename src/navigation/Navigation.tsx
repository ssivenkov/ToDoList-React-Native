import {RootStackParamList, RootStackScreens} from '@navigation/types';
import {WithAuthNavigator} from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Theme} from '@react-navigation/native/src/types';
import {GoogleWebClientId} from '@root/api/config';
import {SignInScreen} from '@root/screens/signInScreen/SignInScreen';
import {checkUserAction} from '@store/actions/userSagaActions/checkUserAction';
import {createChannelAction} from '@store/actions/userSagaActions/createChannelAction';
import {getUserDataAction} from '@store/actions/userSagaActions/getUserDataAction';
import {UserDataType} from '@store/reducers/userReducer/types';
import {
  channelIDSelector,
  themeSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const userID = useSelector(userIDSelector);
  const channelID = useSelector(channelIDSelector);
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const backgroundTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.BACKGROUND_COLOR,
    },
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
