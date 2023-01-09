import { StyleSheet, ViewStyle } from 'react-native';

type LoaderStylesType = {
  loaderContainer: ViewStyle;
};

export const styles = StyleSheet.create<LoaderStylesType>({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
