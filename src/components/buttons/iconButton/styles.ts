import { StyleSheet, ViewStyle } from 'react-native';

type IconButtonStylesType = {
  icon: ViewStyle;
};

export const styles = StyleSheet.create<IconButtonStylesType>({
  icon: {
    justifyContent: 'center',
    marginHorizontal: 0,
  },
});
