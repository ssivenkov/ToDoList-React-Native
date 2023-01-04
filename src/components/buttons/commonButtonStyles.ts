import { StyleSheet, ViewStyle } from 'react-native';

type CommonButtonStylesType = {
  buttonContainer: ViewStyle;
  disabled: ViewStyle;
};

export const commonButtonStyles = StyleSheet.create<CommonButtonStylesType>({
  buttonContainer: {
    padding: 5,
  },

  disabled: {
    opacity: 0.3,
  },
});
