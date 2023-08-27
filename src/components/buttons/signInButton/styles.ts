import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInButtonStylesType = {
  button: ViewStyle;
  disabled: ViewStyle;
  email: ViewStyle;
  facebook: ViewStyle;
  google: ViewStyle;
  icon: FontAwesomeIconStyle;
  text: TextStyle;
  textContainer: ViewStyle;
};

const { WHITE, CORNFLOWER_BLUE, CHAMBRAY, DUSTY_GRAY, JAPANESE_LAUREL } = COLORS;

export const signInButtonStyles = StyleSheet.create<SignInButtonStylesType>({
  button: {
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
  },

  disabled: {
    backgroundColor: DUSTY_GRAY,
  },

  email: {
    backgroundColor: JAPANESE_LAUREL,
  },

  facebook: {
    backgroundColor: CHAMBRAY,
  },

  google: {
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
