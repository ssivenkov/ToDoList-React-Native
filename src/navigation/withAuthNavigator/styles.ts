import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import {
  buttonContainerMarginRight,
  headerHeight,
  headerTitleFontSize,
} from '@navigation/commonNavigationStyles';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type WithAuthNavigatorStylesType = {
  header: ViewStyle;
  headerTitle: TextStyle;
  tabBarContainer: ViewStyle;
  tabFocusIcon: FontAwesomeIconStyle;
  tabIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

export const iOSTabBarContainerHeight = 82;
export const androidTabBarContainerHeight = 50;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<WithAuthNavigatorStylesType>({
    header: {
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      height: headerHeight,
    },

    headerTitle: {
      color: COLORS.WHITE,
      fontSize: headerTitleFontSize,
    },

    tabBarContainer: {
      height:
        Platform.OS === 'ios' ? iOSTabBarContainerHeight : androidTabBarContainerHeight,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
      borderTopWidth: 0,
    },

    tabFocusIcon: {
      color: props.ACCENT_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    buttonContainer: {
      marginRight: buttonContainerMarginRight,
    },

    icon: {
      marginTop: 5,
    },

    title: {
      fontSize: 14,
      marginBottom: 2,
    },
  });
