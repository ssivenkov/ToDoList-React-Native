import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type SignInScreenStylesType = {
  container: ViewStyle;
  inputContainer: ViewStyle;
  errorContainer: ViewStyle;
  title: TextStyle;
  error: TextStyle;
  bigButtonContainer: ViewStyle;
};

export const styles = StyleSheet.create<SignInScreenStylesType>({
  container: {
    marginHorizontal: 15,
    alignItems: 'center',
  },

  inputContainer: {
    marginVertical: 15,
    position: 'relative',
  },

  errorContainer: {
    position: 'absolute',
    top: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#000',
    marginTop: 30,
    marginBottom: 10,
  },

  error: {
    fontSize: 14,
    color: 'red',
  },

  bigButtonContainer: {
    marginTop: 30,
  },
});
