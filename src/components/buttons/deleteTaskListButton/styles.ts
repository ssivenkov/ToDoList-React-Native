import {StyleSheet, TextStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
};

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  warnText: {
    marginBottom: 15,
    color: '#000',
    fontSize: 20,
  },

  redHighlightTask: {
    color: 'red',
    fontWeight: '500',
  },
});
