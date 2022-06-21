import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type WithAuthNavigationStylesType = {
  header: ViewStyle;
  headerTitleStyle: TextStyle;
  tabBarContainer: ViewStyle;
  tabFocusIcon: FontAwesomeIconStyle;
  tabIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

const iOSHeaderHeight = 90;
const androidHeaderHeight = 50;
const iOSTabBarContainerHeight = 82;
const androidTabBarContainerHeight = 50;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<WithAuthNavigationStylesType>({
    header: {
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      height: Platform.OS === 'ios' ? iOSHeaderHeight : androidHeaderHeight,
    },

    headerTitleStyle: {
      color: COLORS.WHITE,
      fontSize: 22,
    },

    tabBarContainer: {
      height:
        Platform.OS === 'ios' ? iOSTabBarContainerHeight : androidTabBarContainerHeight,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    tabFocusIcon: {
      color: props.ACCENT_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    buttonContainer: {
      marginRight: 12,
    },

    icon: {
      marginTop: 5,
    },

    title: {
      fontSize: 14,
      marginBottom: 2,
    },
  });
