import { COLORS } from '@colors/colors';
import { screenWidth480px } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
  appIcon: ImageStyle;
};

const iOSAppIconDivider = 2.25;
const androidAppIconDivider = 2.4;
const borderRadiusCoefficient = 0.01;
const narrowScreenMarginHorizontal = 15;
const otherScreensMarginHorizontal = 30;
const appIconDivider = Platform.OS === 'ios' ? iOSAppIconDivider : androidAppIconDivider;

export const signInScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SignInScreenStylesType>({
    signInWrapper: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal:
        props.appWidth <= screenWidth480px
          ? narrowScreenMarginHorizontal
          : otherScreensMarginHorizontal,
    },

    signInContainer: {
      width: '100%',
      maxWidth: 380,
      alignItems: 'center',
      justifyContent: 'center',
    },

    screenTitle: {
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 10,
      color: COLORS.WHITE,
    },

    appIcon: {
      width: props.appWidth / appIconDivider,
      height: props.appWidth / appIconDivider,
      maxWidth: 200,
      maxHeight: 200,
      borderRadius:
        props.appWidth / appIconDivider / (props.appWidth * borderRadiusCoefficient),
      marginBottom: 40,
      resizeMode: 'contain',
    },
  });
