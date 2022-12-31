import { COLORS } from '@colors/colors';
import {
  headerButtonMargin,
  headerHeight,
  headerTitleFontSize,
} from '@navigation/commonNavigationStyles';
import { tabBarContainerHeight } from '@navigation/withAuthNavigator/styles';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type NotepadScreenStylesType = {
  header: ViewStyle;
  headerTitle: ViewStyle;
  leftButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
  scrollViewContainer: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotepadScreenStylesType>({
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
      marginBottom: tabBarContainerHeight,
    },
  });
