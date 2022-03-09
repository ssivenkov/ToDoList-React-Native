import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  textButton: ViewStyle;
  text: TextStyle;
  bigImage: ImageStyle;
  smallImage: ImageStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  textButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#123',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#fff',
  },

  bigImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  smallImage: {
    width: 23,
    height: 23,
    marginHorizontal: 6,
    resizeMode: 'contain',
  },
});
