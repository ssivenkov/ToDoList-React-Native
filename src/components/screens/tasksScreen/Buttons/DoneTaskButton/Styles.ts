import {StyleSheet, TextStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  warnText: TextStyle;
  greenHighlightTask: TextStyle;
};

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  warnText: {
    marginBottom: 15,
    color: '#000',
    fontSize: 20,
  },

  greenHighlightTask: {
    color: '#090',
    fontWeight: '500',
  },
});
