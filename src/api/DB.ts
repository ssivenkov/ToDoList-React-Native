import { DATABASE_LINK } from '@env';
import { firebase } from '@react-native-firebase/database';

export const DB = firebase.app().database(DATABASE_LINK);
