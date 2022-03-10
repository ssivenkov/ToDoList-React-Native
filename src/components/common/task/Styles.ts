import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
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

  warnText: {
    color: '#000',
    fontSize: 20,
  },

  redHighlightTask: {
    color: 'red',
    fontWeight: '500',
  },

  greenHighlightTask: {
    color: '#090',
    fontWeight: '500',
  },
});
