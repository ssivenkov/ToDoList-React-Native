import { COLORS } from '@colors/colors';
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
const iOSBorderRadiusDivider = 18;
const androidBorderRadiusDivider = 10;
const appIconDivider = Platform.OS === 'ios' ? iOSAppIconDivider : androidAppIconDivider;

export const signInScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SignInScreenStylesType>({
    signInWrapper: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
    },

    signInContainer: {
      width: '100%',
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
      borderRadius:
        Platform.OS === 'ios'
          ? props.appWidth / iOSBorderRadiusDivider
          : props.appWidth / androidBorderRadiusDivider,
      marginBottom: 40,
      resizeMode: 'contain',
    },
  });
