import { StyleSheet, ViewStyle } from 'react-native';

type ContactTheAuthorScreenPropsType = {
  screenContainer: ViewStyle;
  inputsWrapper: ViewStyle;
  inputWrapper: ViewStyle;
  buttonContainer: ViewStyle;
};

export const styles = () =>
  StyleSheet.create<ContactTheAuthorScreenPropsType>({
    screenContainer: {
      marginHorizontal: 18,
      marginTop: 22,
    },

    inputsWrapper: {
      marginBottom: 20,
    },

    inputWrapper: {
      marginBottom: 20,
    },

    buttonContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
  });
