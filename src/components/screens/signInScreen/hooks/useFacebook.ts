import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {errorAlert} from '@root/helpers/Alert';
import {
  FacebookSignOut,
  getFacebookUserData,
} from '@store/actions/signInSagaActions/signInSagaActions';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

export const useFacebook = () => {
  const dispatch = useDispatch();
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const [facebookUserData, setFacebookUserData] =
    useState<FirebaseAuthTypes.User | null>(null);
  const [waitingFacebookUserData, setWaitingFacebookUserData] =
    useState<boolean>(false);

  const onFacebookButtonPress = () => {
    try {
      dispatch(getFacebookUserData({setWaitingFacebookUserData}));
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    } finally {
      setWaitingFacebookUserData(false);
    }
  };

  const onFacebookAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setFacebookUserData(user);
    if (waitingFacebookUserData) setWaitingFacebookUserData(false);
    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  const facebookSignOut = () => {
    try {
      dispatch(FacebookSignOut());
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onFacebookAuthStateChanged(user),
    );

    return subscriber;
  }, []);

  return {
    facebookSignOut,
    onFacebookButtonPress,
    facebookUserData,
    waitingFacebookUserData,
  };
};
