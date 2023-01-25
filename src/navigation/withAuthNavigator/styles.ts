import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  headerHeight,
  headerTitleFontSize,
  tabBarContainerHeight,
} from '@navigation/commonNavigationStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type WithAuthNavigatorStylesType = {
  header: ViewStyle;
  headerTitle: TextStyle;
  bottomTabBarContainer: ViewStyle;
  bottomTabIconFocus: FontAwesomeIconStyle;
  bottomTabIcon: FontAwesomeIconStyle;
  bottomTabBarIcon: TextStyle;
  bottomTabBarTitle: TextStyle;
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

    bottomTabBarContainer: {
      height: tabBarContainerHeight,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
      borderTopWidth: 0,
    },

    bottomTabIconFocus: {
      color: props.ACCENT_COLOR,
    },

    bottomTabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    bottomTabBarIcon: {
      marginTop: 5,
    },

    bottomTabBarTitle: {
      fontSize: 14,
      marginBottom: 1,
    },
  });
