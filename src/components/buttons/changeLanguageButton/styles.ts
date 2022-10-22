import {
  androidHeaderHeight,
  androidTabBarContainerHeight,
  iOSHeaderHeight,
  iOSTabBarContainerHeight,
} from '@navigation/withAuthNavigator/styles';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type DarkModeButtonStylesType = {
  buttonsContainer: ViewStyle;
  buttonContainer: ViewStyle;
  languageIndicatorText: TextStyle;
};

const statusBarHeightMultiplier = 2;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DarkModeButtonStylesType>({
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
