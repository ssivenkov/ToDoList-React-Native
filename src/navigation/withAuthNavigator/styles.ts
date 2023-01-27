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
  bottomTabBarContainer: ViewStyle;
  bottomTabBarIcon: TextStyle;
  bottomTabBarTitle: TextStyle;
  bottomTabIcon: FontAwesomeIconStyle;
  bottomTabIconFocus: FontAwesomeIconStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
};

export const withAuthNavigatorStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<WithAuthNavigatorStylesType>({
    bottomTabBarContainer: {
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
      borderTopWidth: 0,
      height: tabBarContainerHeight,
    },

    bottomTabBarIcon: {
      marginTop: 5,
    },

    bottomTabBarTitle: {
      fontSize: 14,
      marginBottom: 1,
    },

    bottomTabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    bottomTabIconFocus: {
      color: props.ACCENT_COLOR,
    },

    header: {
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      height: headerHeight,
    },

    headerTitle: {
      color: COLORS.WHITE,
      fontSize: headerTitleFontSize,
    },
  });
