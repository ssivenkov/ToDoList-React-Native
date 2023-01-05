import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  headerButtonMargin,
  headerHeight,
  headerTitleFontSize,
  tabBarContainerHeight,
} from '@navigation/commonNavigationStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type NotepadScreenStylesType = {
  darkModeScreenContainer: ViewStyle;
  header: ViewStyle;
  headerTitle: ViewStyle;
  leftButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
  scrollViewContainer: ViewStyle;
};

export const notepadScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotepadScreenStylesType>({
    darkModeScreenContainer: {
      height: '100%',
      backgroundColor: COLORS.WOODSMOKE1,
    },

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

    scrollViewContainer: {
      paddingBottom: tabBarContainerHeight,
    },
  });
