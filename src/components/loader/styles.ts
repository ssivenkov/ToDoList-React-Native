import { StyleSheet, ViewStyle } from 'react-native';

type LoaderStylesType = {
  loaderContainer: ViewStyle;
};

export const styles = StyleSheet.create<LoaderStylesType>({
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
