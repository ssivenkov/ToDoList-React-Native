import {StyleSheet, TextStyle} from 'react-native';

type InputStylesType = {
  input: TextStyle;
};

export const styles = StyleSheet.create<InputStylesType>({
  input: {
    color: '#000',
    fontSize: 18,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: 'darkred',
  },
});
