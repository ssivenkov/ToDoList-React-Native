import { COLORS } from '@colors/colors';
import { screenWidth480px } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInScreenStylesType = {
  appIcon: ImageStyle;
  screenTitle: TextStyle;
  signInContainer: ViewStyle;
  signInWrapper: ViewStyle;
};

const iOSAppIconDivider = 2.25;
const androidAppIconDivider = 2.4;
const borderRadiusCoefficient = 0.01;
const narrowScreenMarginHorizontal = 15;
const otherScreensMarginHorizontal = 30;
const appIconDivider = Platform.OS === 'ios' ? iOSAppIconDivider : androidAppIconDivider;

export const signInScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SignInScreenStylesType>({
    appIcon: {
      borderRadius:
        props.appWidth / appIconDivider / (props.appWidth * borderRadiusCoefficient),
      height: props.appWidth / appIconDivider,
      marginBottom: 40,
      maxHeight: 200,
      maxWidth: 200,
      resizeMode: 'contain',
      width: props.appWidth / appIconDivider,
    },

    screenTitle: {
      color: COLORS.WHITE,
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 10,
    },

    signInContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 380,
      width: '100%',
    },

    signInWrapper: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      marginHorizontal:
        props.appWidth <= screenWidth480px
          ? narrowScreenMarginHorizontal
          : otherScreensMarginHorizontal,
    },
  });
