import {SignInScreen} from '@components/screens/signInScreen/SignInScreen';
import {SignIn, WithAuth} from '@constants/constants';
import {RootStackParamList} from '@navigation/types';
import {WithAuthNavigation} from '@navigation/withAuthNavigation/WithAuthNavigation';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleWebClientId} from '@root/api/config';
import {setUserData} from '@store/actions/authReducerActions/setUserData';
import {setUserID} from '@store/actions/authReducerActions/setUserID';
import {createChannel} from '@store/actions/authSagaActions/createChannel';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useDispatch();
  const isUserAuth = !!useSelector(getUserID);
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const channelID: string = useSelector(getChannelID);

  const onAuthStateChanged = (userData: UserDataType) => {
    dispatch(setUserData({userData: userData}));

    if (userData) {
      dispatch(setUserID({userID: userData.uid}));
    } else {
      dispatch(setUserID({userID: null}));
    }

    if (firebaseInitializing) {
      setFirebaseInitializing(false);
    }
  };

  useEffect(() => {
    if (!channelID) dispatch(createChannel());

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
