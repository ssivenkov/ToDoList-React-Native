import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#30d0fe',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        color: '#000',
      },
      android: {
        color: '#000',
      },
      default: {
        color: '#000',
      },
    }),
  },
});
