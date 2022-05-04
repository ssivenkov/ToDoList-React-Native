import {RootStackParamList} from '@navigation/types';
import {WithAuthNavigator} from '@navigation/withAuthNavigator/WithAuthNavigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleWebClientId} from '@root/api/config';
import {SignInScreen} from '@root/screens/signInScreen/SignInScreen';
import {setUserDataAction} from '@store/actions/authReducerActions/setUserDataAction';
import {setUserIDAction} from '@store/actions/authReducerActions/setUserIDAction';
import {checkUserAction} from '@store/actions/authSagaActions/checkUserAction';
import {createChannelAction} from '@store/actions/authSagaActions/createChannelAction';
import {UserDataType} from '@store/reducers/authReducer/types';
import {
  channelIDSelector,
  userIDSelector,
} from '@store/selectors/authSelectors';
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
    dispatch(setUserDataAction({userData}));

    if (userData) {
      dispatch(checkUserAction());
      dispatch(setUserIDAction({userID: userData.uid}));
    } else {
      dispatch(setUserIDAction({userID: null}));
    }

    if (firebaseInitializing) {
      setFirebaseInitializing(false);
    }
  };

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
              name={'WithAuth'}
              component={WithAuthNavigator}
              options={{headerShown: false}}
            />
          ) : (
            <Screen
              name={'SignIn'}
              component={SignInScreen}
              options={{headerShown: false}}
            />
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
