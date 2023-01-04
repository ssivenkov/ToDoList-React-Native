import { StyleSheet, ViewStyle } from 'react-native';

type ContactTheAuthorScreenStylesType = {
  screenContainer: ViewStyle;
  inputsWrapper: ViewStyle;
  inputWrapper: ViewStyle;
  buttonContainer: ViewStyle;
};

export const contactTheAuthorScreenStyles = () =>
  StyleSheet.create<ContactTheAuthorScreenStylesType>({
    screenContainer: {
      paddingHorizontal: 18,
      paddingTop: 22,
    },

    inputsWrapper: {
      marginBottom: 20,
    },

    inputWrapper: {
      marginBottom: 20,
    },

    buttonContainer: {
      alignItems: 'center',
      marginBottom: 70,
    },
  });
