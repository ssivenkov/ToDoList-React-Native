import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CustomButtonStylesType = {
  button: ViewStyle;
  icon: FontAwesomeIconStyle;
  text: TextStyle;
  googleStyle: ViewStyle;
  facebookStyle: ViewStyle;
};

export const signInStyles = StyleSheet.create<CustomButtonStylesType>({
  button: {
    flexDirection: 'row',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
  },

  icon: {
    marginRight: 15,
    marginLeft: 5,
    color: COLORS.WHITE,
  },

  text: {
    fontSize: 22,
    color: COLORS.WHITE,
  },

  googleStyle: {
    backgroundColor: COLORS.CORNFLOWER_BLUE,
  },

  facebookStyle: {
    backgroundColor: COLORS.CHAMBRAY,
  },
});
