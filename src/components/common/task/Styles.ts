import {StyleSheet, TextStyle} from 'react-native';

type TaskStylesType = {
  text: TextStyle;
};

export const Styles = StyleSheet.create<TaskStylesType>({
  text: {
    color: 'red',
    fontSize: 20,
  },
});
