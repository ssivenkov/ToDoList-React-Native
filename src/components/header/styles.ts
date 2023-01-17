import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  headerButtonMargin,
  headerHeight,
  headerTitleFontSize,
} from '@navigation/commonNavigationStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type HeaderStylesType = {
  header: ViewStyle;
  headerTitle: ViewStyle;
  leftButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
};

export const headerStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<HeaderStylesType>({
    header: {
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      height: headerHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    headerTitle: {
      color: COLORS.WHITE,
      fontSize: headerTitleFontSize,
      fontWeight: '600',
    },

    leftButtonContainer: {
      marginLeft: headerButtonMargin,
    },

    rightButtonContainer: {
      marginRight: headerButtonMargin,
    },
  });
