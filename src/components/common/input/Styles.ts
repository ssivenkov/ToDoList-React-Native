import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type InputStylesType = {
  container: ViewStyle;
  input: TextStyle;
};

export const styles = StyleSheet.create<InputStylesType>({
  container: {
    flexDirection: 'row',
  },

  input: {
    width: '100%',
    alignContent: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
});
