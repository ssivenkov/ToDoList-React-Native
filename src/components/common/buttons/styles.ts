import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  bigButton: ViewStyle;
  disable: ViewStyle;
  textButton: ViewStyle;
  bigText: TextStyle;
  text: TextStyle;
  icon: ViewStyle;
};

export const styles = StyleSheet.create<CustomButtonStylesType>({
  bigButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#5015b7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disable: {
    opacity: 0.4,
  },

  textButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#123',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bigText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  text: {
    fontSize: 19,
    color: '#fff',
  },

  icon: {
    marginHorizontal: 4,
  },
});
