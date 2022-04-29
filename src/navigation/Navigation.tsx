import {SignInScreen} from '@components/screens/signInScreen/SignInScreen';
import {SignIn, WithAuth} from '@constants/constants';
import {RootStackParamList} from '@navigation/types';
import {WithAuthNavigation} from '@navigation/withAuthNavigation/WithAuthNavigation';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleWebClientId} from '@root/api/config';
import {setUserDataAction} from '@store/actions/authReducerActions/setUserDataAction';
import {setUserIDAction} from '@store/actions/authReducerActions/setUserIDAction';
import {createChannelAction} from '@store/actions/authSagaActions/createChannelAction';
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
    dispatch(setUserDataAction({userData: userData}));

    if (userData) {
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
