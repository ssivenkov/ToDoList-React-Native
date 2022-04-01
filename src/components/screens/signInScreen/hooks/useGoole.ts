import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';

export const useGoogle = () => {
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const [googleUserData, setGoogleUserData] =
    useState<FirebaseAuthTypes.User | null>(null);
  let waitingGoogleUserData = false;

  const onGoogleButtonPress = async () => {
    waitingGoogleUserData = true;
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      waitingGoogleUserData = false;

      return null;
    }
  };

  const onGoogleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setGoogleUserData(user);
    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  const googleSignOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (err) {}
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
