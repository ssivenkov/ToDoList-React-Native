import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

type CustomButtonStylesType = {
  squareContainer: ViewStyle;
  text: ViewStyle;
  bigImage: ImageStyle;
  smallImage: ImageStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  squareContainer: {
    marginLeft: 20,
    marginRight: 5,
  },

  text: {
    marginLeft: 20,
    marginRight: 5,
  },

  bigImage: {
    width: 30,
    height: 30,
    marginVertical: 6,
    resizeMode: 'contain',
  },

  smallImage: {
    width: 20,
    height: 20,
    marginVertical: 6,
    resizeMode: 'contain',
  },
});
