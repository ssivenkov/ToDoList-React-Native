import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type TasksNavigatorStylesType = {
  topTabBarContainer: ViewStyle;
  topTabBarItem: ViewStyle;
  topTabIconContainer: TextStyle;
  topTabIcon: FontAwesomeIconStyle;
  topTabIconFocus: FontAwesomeIconStyle;
  topTabIndicator: ViewStyle;
  topTabTitle: TextStyle;
};

export const tasksNavigatorStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TasksNavigatorStylesType>({
    topTabBarContainer: {
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    topTabBarItem: {
      height: 50,
    },

    topTabIconContainer: {
      marginTop: 1,
    },

    topTabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    topTabIconFocus: {
      color: props.ACCENT_COLOR,
    },

    topTabIndicator: {
      backgroundColor: props.ACCENT_COLOR,
    },

    topTabTitle: {
      fontSize: 12,
      lineHeight: 14,
      textTransform: 'none',
      marginTop: 0,
    },
  });
