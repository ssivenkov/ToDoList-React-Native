import {Alert} from 'react-native';

export const errorAlert = (error: any) => {
  Alert.alert(error.toString());
};
