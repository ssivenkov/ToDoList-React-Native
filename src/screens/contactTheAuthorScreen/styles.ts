import { StyleSheet, ViewStyle } from 'react-native';

type ContactTheAuthorScreenStylesType = {
  buttonContainer: ViewStyle;
  inputWrapper: ViewStyle;
  inputsWrapper: ViewStyle;
  screenContainer: ViewStyle;
};

export const contactTheAuthorScreenStyles = () =>
  StyleSheet.create<ContactTheAuthorScreenStylesType>({
    buttonContainer: {
      alignItems: 'center',
      marginBottom: 70,
    },

    inputWrapper: {
      marginBottom: 20,
    },

    inputsWrapper: {
      marginBottom: 20,
    },

    screenContainer: {
      paddingHorizontal: 18,
      paddingTop: 22,
    },
  });
