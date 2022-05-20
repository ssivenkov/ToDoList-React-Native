import {Alert} from 'react-native';

export const errorAlert = (error: Error | string) => {
  Alert.alert(error.toString());
};
