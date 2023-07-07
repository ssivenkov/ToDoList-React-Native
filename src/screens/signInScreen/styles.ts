import { COLORS } from '@colors/colors';
import { appLogoDivider } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { headerHeight } from '@navigation/commonNavigationStyles';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SignInScreenStylesType = {
  appLogoImage: ImageStyle;
  appLogoSvg: ImageStyle;
  formContainer: ViewStyle;
  inputWrapper: ViewStyle;
  linearGradient: ViewStyle;
  screenTitle: TextStyle;
  signInContentContainer: ViewStyle;
  signInContentWrapper: ViewStyle;
  signInScrollViewWithLoaderWrapper: ViewStyle;
  signInScrollViewWrapper: ViewStyle;
  signInServicesButtonsContainer: ViewStyle;
  submitButtonContainer: ViewStyle;
};

const borderRadiusCoefficient = 0.01;
const mobileScreenMarginHorizontal = 30;
const tabletScreensMarginHorizontalDivider = 6;
const appLogoMarginTopDivider = 8;
const appLogoMarginBottom = 40;
const phoneMinAspectRatio = 1.6;

export const signInScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SignInScreenStylesType>({
    linearGradient: {
      minHeight: '100%',
    },

    appLogoImage: {
      borderRadius:
        props.appWidth / appLogoDivider / (props.appWidth * borderRadiusCoefficient),
      height: props.appWidth / appLogoDivider,
      marginTop: props.appHeight / appLogoMarginTopDivider,
      marginBottom: appLogoMarginBottom,
      maxHeight: 200,
      maxWidth: 200,
      resizeMode: 'contain',
      width: props.appWidth / appLogoDivider,
    },

    appLogoSvg: {
      marginTop: props.appHeight / appLogoMarginTopDivider,
      marginBottom: appLogoMarginBottom,
    },

    screenTitle: {
      color: COLORS.WHITE,
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 10,
    },

    signInContentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal:
        props.appHeight / props.appWidth >= phoneMinAspectRatio
          ? mobileScreenMarginHorizontal
          : props.appWidth / tabletScreensMarginHorizontalDivider,
    },

    signInContentWrapper: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingBottom: headerHeight,
    },

    signInScrollViewWithLoaderWrapper: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },

    signInScrollViewWrapper: {
      alignItems: 'center',
      minHeight: '100%',
    },

    formContainer: {
      width: '100%',
    },

    inputWrapper: {
      marginBottom: 15,
    },

    submitButtonContainer: {
      marginTop: 15,
    },

    signInServicesButtonsContainer: {
      marginBottom: 10,
    },
  });
