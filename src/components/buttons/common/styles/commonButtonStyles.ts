import { StyleSheet, ViewStyle } from 'react-native';

type ButtonCommonStylesType = {
  buttonContainer: ViewStyle;
};

export const commonButtonStyles = StyleSheet.create<ButtonCommonStylesType>({
  buttonContainer: {
    padding: 5,
  },
});
