import {SignInScreen} from '@components/screens/signInScreen/SignInScreen';
import {SignIn, WithAuth} from '@constants/constants';
import {RootStackParamList} from '@navigation/types';
import {WithAuthNavigation} from '@navigation/withAuthNavigation/WithAuthNavigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleWebClientId} from '@root/api/config';
import {setUserData} from '@store/actions/authActions/authActions';
import {checkUser} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {getUserAuthStatus} from '@store/selectors/authSelectors';
import {AppRootStateType} from '@store/store';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useDispatch();
  const isUserAuth = useSelector<AppRootStateType, boolean>(getUserAuthStatus);
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    dispatch(setUserData(user));

    if (user) {
      dispatch(checkUser());
    }

    if (firebaseInitializing) {
      setFirebaseInitializing(false);
    }
  };

  useEffect(() => {
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
          {isUserAuth ? (
            <Screen
              name={WithAuth}
              component={WithAuthNavigation}
              options={{headerShown: false}}
            />
          ) : (
            <Screen
              name={SignIn}
              component={SignInScreen}
              options={{headerShown: false}}
            />
          )}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
