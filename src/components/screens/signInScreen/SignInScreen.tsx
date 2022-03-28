import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {SignInButton} from '@components/screens/signInScreen/SignInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/SignInButton/styles';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth/lib';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';

export const SignInScreen = (): ReturnComponentType => {
  const {t} = useTranslation();
  const [firebaseInitializing, setFirebaseInitializing] =
    useState<boolean>(true);
  const [userData, setUserData] = useState<FirebaseAuthTypes.User | null>();
  let waitingUserData = false;

  const onGoogleButtonPress = async () => {
    waitingUserData = true;
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      waitingUserData = false;
    }
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUserData(user);
    if (firebaseInitializing) setFirebaseInitializing(false);
  };

  const signOut = () => {
    auth().signOut();
    GoogleSignin.signOut();
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '39222740250-rco3iuni391tlvdtj9vm857nsmp6t5db.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (!userData) {
    return (
      <View style={styles.signInScreenContainer}>
        <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
        <SignInButton
          onPress={onGoogleButtonPress}
          serviceTitle={'Google'}
          icon={faGoogle}
          buttonColorStyle={signInStyles.googleStyle}
          disabled={waitingUserData && !userData}
        />
      </View>
    );
  }

  return (
    <View style={styles.signInScreenContainer}>
      <Text style={styles.screenTitle}>{userData.displayName}</Text>
      {userData.photoURL && (
        <Image source={{uri: userData.photoURL}} style={styles.avatar} />
      )}
      <CustomTextButton
        title={'Sign out'}
        onPress={signOut}
        disable={!userData}
      />
    </View>
  );
};
