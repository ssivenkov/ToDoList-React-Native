import { COLORS } from '@colors/colors';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import {
  buttonContainerMarginRight,
  headerHeight,
  headerTitleFontSize,
} from '@navigation/commonNavigationStyles';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type RootNavigatorStylesType = {
  header: ViewStyle;
  headerTitleStyle: TextStyle;
  tabIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<RootNavigatorStylesType>({
    header: {
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      height: headerHeight,
    },

    headerTitleStyle: {
      color: COLORS.WHITE,
      fontSize: headerTitleFontSize,
    },

    tabIcon: {
      color: props.TAB_BAR_ICON_COLOR,
    },

    buttonContainer: {
      marginRight: buttonContainerMarginRight,
    },
  });
