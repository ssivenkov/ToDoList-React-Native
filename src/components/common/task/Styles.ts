import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<TaskStylesType>({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 2,
    borderRadius: 7,
    backgroundColor: '#aaa',
  },

  text: {
    color: '#000',
    fontSize: 20,
  },
});
