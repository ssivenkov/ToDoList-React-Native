import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  androidHeaderHeight,
  androidTabBarContainerHeight,
  iOSHeaderHeight,
  iOSTabBarContainerHeight,
} from '@navigation/commonNavigationStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type ChangeLanguageButtonStylesType = {
  buttonsContainer: ViewStyle;
  buttonContainer: ViewStyle;
  languageIndicatorText: TextStyle;
};

const statusBarHeightMultiplier = 2;

export const changeLanguageButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ChangeLanguageButtonStylesType>({
    buttonsContainer: {
      maxHeight:
        props.appHeight -
        (Platform.OS === 'ios'
          ? getStatusBarHeight() * statusBarHeightMultiplier +
            iOSHeaderHeight +
            iOSTabBarContainerHeight
          : getStatusBarHeight() * statusBarHeightMultiplier +
            androidHeaderHeight +
            androidTabBarContainerHeight),
      maxWidth: 250,
    },

    buttonContainer: {
      margin: 8,
    },

    languageIndicatorText: {
      fontSize: 20,
      textTransform: 'uppercase',
      color: props.TEXT_COLOR,
    },
  });
