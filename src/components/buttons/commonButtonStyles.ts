import { StyleSheet, ViewStyle } from 'react-native';

type CommonButtonStylesType = {
  buttonContainer: ViewStyle;
  buttonContainerLargePaddingHorizontal: ViewStyle;
  disabled: ViewStyle;
};

export const commonButtonStyles = StyleSheet.create<CommonButtonStylesType>({
  buttonContainerLargePaddingHorizontal: {
    paddingHorizontal: 15,
  },

  buttonContainer: {
    padding: 5,
  },

  disabled: {
    opacity: 0.3,
  },
});
