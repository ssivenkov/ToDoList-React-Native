import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  GetGoogleUserDataActionsType,
  GoogleAuthCredential,
} from '@store/actions/signInActions/types';
import {Alert} from 'react-native';
import {call} from 'redux-saga/effects';

const signInWithCredential = (credential: GoogleAuthCredential) => {
  return auth().signInWithCredential(credential);
};

const GoogleSignOut = () => {
  return auth().signOut();
};

export function* googleUserDataWorker(action: GetGoogleUserDataActionsType) {
  const {setWaitingGoogleUserData} = action.payload;
  setWaitingGoogleUserData(true);
  try {
    const {idToken} = yield call(GoogleSignin.signIn);
    const googleCredential: GoogleAuthCredential = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );
    yield call(signInWithCredential, googleCredential);
  } catch (err: any) {
    Alert.alert(err.toString());
  }
}

export function* googleSignOutWorker() {
  try {
    yield call(GoogleSignOut);
    yield call(GoogleSignin.signOut);
  } catch (err: any) {
    Alert.alert(err.toString());
  }
}
