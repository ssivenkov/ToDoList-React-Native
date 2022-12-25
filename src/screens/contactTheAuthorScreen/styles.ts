import { StyleSheet, ViewStyle } from 'react-native';

type ContactTheAuthorScreenPropsType = {
  screenContainer: ViewStyle;
  inputWrapper: ViewStyle;
};

export const styles = () =>
  StyleSheet.create<ContactTheAuthorScreenPropsType>({
    screenContainer: {
      alignItems: 'center',
      marginHorizontal: 18,
      marginTop: 22,
    },

    inputWrapper: {
      marginBottom: 50,
    },
  });
