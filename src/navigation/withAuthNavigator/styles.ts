import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  headerButtonMargin,
  headerHeight,
  headerTitleFontSize,
  tabBarContainerHeight,
} from '@navigation/commonNavigationStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type WithAuthNavigatorStylesType = {
  header: ViewStyle;
  headerTitle: TextStyle;
  tabBarContainer: ViewStyle;
  tabFocusIcon: FontAwesomeIconStyle;
  tabIcon: FontAwesomeIconStyle;
  rightButtonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

export const withAuthNavigatorStyles = (props: ExtendedStylesPropsType) =>
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
      height: tabBarContainerHeight,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
      borderTopWidth: 0,
    },

    tabFocusIcon: {
      color: props.ACCENT_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    rightButtonContainer: {
      marginRight: headerButtonMargin,
    },

    icon: {
      marginTop: 5,
    },

    title: {
      fontSize: 14,
      marginBottom: 2,
    },
  });
