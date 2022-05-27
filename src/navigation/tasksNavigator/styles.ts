import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TasksNavigationStylesType = {
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

const {WHITE} = COLORS;

export const styles = (props: ThemeType) =>
  StyleSheet.create<TasksNavigationStylesType>({
    tabBarContainer: {
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    tabBarItem: {
      height: 60,
    },

    tabFocusIcon: {
      color: props.TAB_BAR_FOCUS_ICON_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    tabBarIndicator: {
      backgroundColor: props.TAB_BAR_INDICATOR_COLOR,
    },

    headerTitleStyle: {
      color: WHITE,
      fontSize: 24,
    },

    buttonContainer: {
      marginRight: 10,
    },

    icon: {
      marginTop: 2,
    },

    title: {
      marginTop: 8,
    },
  });
