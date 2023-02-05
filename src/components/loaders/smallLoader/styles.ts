import { StyleSheet, ViewStyle } from 'react-native';

type SmallLoaderStylesType = {
  smallLoaderContainer: ViewStyle;
};

export const styles = StyleSheet.create<SmallLoaderStylesType>({
  smallLoaderContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
