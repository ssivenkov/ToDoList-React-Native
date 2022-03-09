import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const styles = StyleSheet.create<TaskStylesType>({
  container: {
    justifyContent: 'space-between',
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

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
