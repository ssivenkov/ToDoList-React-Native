import { StyleSheet, ViewStyle } from 'react-native';

type CustomButtonStylesType = {
  icon: ViewStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  icon: {
    marginHorizontal: 0,
  },
});
