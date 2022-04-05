import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/Alert';
import {
  getGoogleUserData,
  GoogleSignOut,
} from '@store/actions/signInSagaActions/signInSagaActions';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const [googleUserData, setGoogleUserData] =
    useState<FirebaseAuthTypes.User | null>(null);
  const [waitingGoogleUserData, setWaitingGoogleUserData] =
    useState<boolean>(false);

  const onGoogleButtonPress = () => {
    try {
      dispatch(getGoogleUserData({setWaitingGoogleUserData}));
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    } finally {
      setWaitingGoogleUserData(false);
    }
  };

  const onGoogleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setGoogleUserData(user);
    if (waitingGoogleUserData) setWaitingGoogleUserData(false);
    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  const googleSignOut = () => {
    try {
      dispatch(GoogleSignOut());
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '39222740250-rco3iuni391tlvdtj9vm857nsmp6t5db.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged((user) =>
      onGoogleAuthStateChanged(user),
    );

    return subscriber;
  }, []);

  return {
    googleSignOut,
    onGoogleButtonPress,
    googleUserData,
    waitingGoogleUserData,
  };
};
