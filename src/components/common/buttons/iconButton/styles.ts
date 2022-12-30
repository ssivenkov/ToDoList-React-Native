import { StyleSheet, ViewStyle } from 'react-native';

type CustomButtonStylesType = {
  icon: ViewStyle;
  iconDisable: ViewStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  icon: {
    justifyContent: 'center',
    marginHorizontal: 0,
  },

  iconDisable: {
    opacity: 0.3,
  },
});
