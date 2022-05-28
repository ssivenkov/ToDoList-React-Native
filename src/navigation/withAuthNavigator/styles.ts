import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
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

const {WHITE, POMPADOUR} = COLORS;

export const styles = (props: ThemeType) =>
  StyleSheet.create<WithAuthNavigationStylesType>({
    header: {
      backgroundColor: POMPADOUR,
    },

    headerTitleStyle: {
      color: WHITE,
      fontSize: 24,
    },

    tabBarContainer: {
      height: Platform.OS === 'ios' ? 87 : 58,
      backgroundColor: props.TAB_BAR_BACKGROUND_COLOR,
    },

    tabFocusIcon: {
      color: props.TAB_BAR_FOCUS_ICON_COLOR,
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
      fontWeight: '500',
      marginBottom: 2,
    },
  });
