import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type WithAuthNavigationStylesType = {
  header: ViewStyle;
  headerTitleStyle: TextStyle;
  tabBarContainer: ViewStyle;
  tabFocusIcon: FontAwesomeIconStyle;
  tabIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<WithAuthNavigationStylesType>({
    header: {
      backgroundColor: props.darkMode
        ? `${props.ACCENT_COLOR}CC`
        : props.ACCENT_COLOR,
    },

    headerTitleStyle: {
      color: COLORS.WHITE,
      fontSize: 24,
    },

    tabBarContainer: {
      height: Platform.OS === 'ios' ? 87 : 58,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    tabFocusIcon: {
      color: props.ACCENT_COLOR,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    buttonContainer: {
      marginRight: 10,
    },

    icon: {
      marginTop: 5,
    },

    title: {
      fontSize: 16,
      marginBottom: 2,
    },
  });
