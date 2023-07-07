import { statusCodes } from '@react-native-google-signin/google-signin';

export const commonSignInErrors = [
  statusCodes.SIGN_IN_CANCELLED,
  statusCodes.IN_PROGRESS,
  statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
];

const commonEmailErrorCodesOnSignInNavigator = [
  'auth/too-many-requests',
  'auth/invalid-email',
  'auth/weak-password',
  'auth/wrong-password',
];

export const signInWithEmailErrorCodes = [
  'auth/user-not-found',
  ...commonEmailErrorCodesOnSignInNavigator,
];

export const registerWithEmailErrorCodes = [
  'auth/email-already-in-use',
  ...commonEmailErrorCodesOnSignInNavigator,
];
