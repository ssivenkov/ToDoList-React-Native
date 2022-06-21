import { StyleSheet, ViewStyle } from 'react-native';

type ColorPickerStylesType = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<ColorPickerStylesType>({
  container: {
    maxHeight: 200,
    alignItems: 'center',
  },
});
