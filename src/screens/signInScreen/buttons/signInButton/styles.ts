import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInButtonStylesType = {
  button: ViewStyle;
  disabled: ViewStyle;
  icon: FontAwesomeIconStyle;
  text: TextStyle;
  textContainer: ViewStyle;
  googleStyle: ViewStyle;
  facebookStyle: ViewStyle;
};

const { WHITE, CORNFLOWER_BLUE, CHAMBRAY, DUSTY_GRAY } = COLORS;

export const signInButtonStyles = StyleSheet.create<SignInButtonStylesType>({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
  },

  icon: {
    marginRight: 15,
    marginLeft: 2,
    color: WHITE,
  },

  textContainer: {
    flex: 1,
  },

  text: {
    fontSize: 22,
    color: WHITE,
  },

  googleStyle: {
    backgroundColor: CORNFLOWER_BLUE,
  },

  facebookStyle: {
    backgroundColor: CHAMBRAY,
  },

  disabled: {
    backgroundColor: DUSTY_GRAY,
  },
});
