import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInButtonStylesType = {
  button: ViewStyle;
  disabled: ViewStyle;
  facebookStyle: ViewStyle;
  googleStyle: ViewStyle;
  icon: FontAwesomeIconStyle;
  text: TextStyle;
  textContainer: ViewStyle;
};

const { WHITE, CORNFLOWER_BLUE, CHAMBRAY, DUSTY_GRAY } = COLORS;

export const signInButtonStyles = StyleSheet.create<SignInButtonStylesType>({
  button: {
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
  },

  disabled: {
    backgroundColor: DUSTY_GRAY,
  },

  facebookStyle: {
    backgroundColor: CHAMBRAY,
  },

  googleStyle: {
    backgroundColor: CORNFLOWER_BLUE,
  },

  icon: {
    color: WHITE,
    marginLeft: 2,
    marginRight: 15,
  },

  text: {
    color: WHITE,
    fontSize: 22,
  },

  textContainer: {
    flex: 1,
  },
});
