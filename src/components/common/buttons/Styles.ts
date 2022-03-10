import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  textButton: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  textButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#123',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#fff',
  },

  icon: {
    marginHorizontal: 4,
  },
});
