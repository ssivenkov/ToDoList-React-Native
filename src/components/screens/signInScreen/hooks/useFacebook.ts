import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {setSignInStatus} from '@store/actions/signInActions/signInActions';
import {useEffect, useState} from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';

export const useFacebook = () => {
  const dispatch = useDispatch();
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const [facebookUserData, setFacebookUserData] =
    useState<FirebaseAuthTypes.User | null>(null);
  let waitingFacebookUserData = false;

  const onFacebookButtonPress = async () => {
    waitingFacebookUserData = true;
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        // User cancelled the login process
        return null;
      }

      const data = await AccessToken.getCurrentAccessToken();
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data!.accessToken,
      );

      return auth().signInWithCredential(facebookCredential);
    } catch (err) {
      waitingFacebookUserData = false;

      return null;
    }
  };

  const onFacebookAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      dispatch(setSignInStatus('Facebook'));
    } else dispatch(setSignInStatus(''));
    setFacebookUserData(user);
    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  const facebookSignOut = async () => {
    try {
      await auth().signOut();
    } catch (err) {}
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
