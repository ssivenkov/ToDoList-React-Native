import {RootStackParamList, RootStackScreens} from '@navigation/types';
import {WithAuthNavigator} from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleWebClientId} from '@root/api/config';
import {SignInScreen} from '@root/screens/signInScreen/SignInScreen';
import {checkUserAction} from '@store/actions/userSagaActions/checkUserAction';
import {createChannelAction} from '@store/actions/userSagaActions/createChannelAction';
import {getUserDataAction} from '@store/actions/userSagaActions/getUserDataAction';
import {UserDataType} from '@store/reducers/userReducer/types';
import {
  channelIDSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useDispatch();

  const userID = useSelector(userIDSelector);
  const channelID = useSelector(channelIDSelector);
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);

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
      <NavigationContainer>
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
