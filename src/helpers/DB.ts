import {firebase} from '@react-native-firebase/database';
import {DBLink} from '@root/api/config';

export const DB = firebase.app().database(DBLink);
