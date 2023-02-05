import { StyleSheet, ViewStyle } from 'react-native';

type PurpleLoaderStylesType = {
  loaderContainer: ViewStyle;
};

export const styles = StyleSheet.create<PurpleLoaderStylesType>({
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
