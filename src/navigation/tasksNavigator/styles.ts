import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type TasksNavigatorStylesType = {
  tabBarContainer: ViewStyle;
  tabBarItem: ViewStyle;
  tabFocusIcon: FontAwesomeIconStyle;
  tabIcon: FontAwesomeIconStyle;
  tabBarIndicator: ViewStyle;
  headerTitleStyle: TextStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

const { WHITE } = COLORS;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TasksNavigatorStylesType>({
    tabBarContainer: {
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    tabBarItem: {
      height: 50,
    },

    tabFocusIcon: {
      color: props.ACCENT_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    tabBarIndicator: {
      backgroundColor: props.ACCENT_COLOR,
    },

    headerTitleStyle: {
      color: WHITE,
      fontSize: 24,
    },

    buttonContainer: {
      marginRight: 10,
    },

    icon: {
      marginTop: 1,
    },

    title: {
      fontSize: 12,
      marginTop: 0,
    },
  });
