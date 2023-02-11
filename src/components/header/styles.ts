import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { headerHeight, headerTitleFontSize } from '@navigation/commonNavigationStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type HeaderStylesType = {
  header: ViewStyle;
  headerTitle: ViewStyle;
  leftButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
};

const buttonPaddingLong = 13;
const buttonPaddingShort = 6;

export const headerStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<HeaderStylesType>({
    header: {
      alignItems: 'center',
      backgroundColor: props.darkMode ? `${props.ACCENT_COLOR}CC` : props.ACCENT_COLOR,
      flexDirection: 'row',
      height: headerHeight,
      justifyContent: 'space-between',
    },

    headerTitle: {
      color: COLORS.WHITE,
      flex: 1,
      fontSize: headerTitleFontSize,
      fontWeight: '600',
      textAlign: 'center',
    },

    leftButtonContainer: {
      height: '100%',
      justifyContent: 'center',
      paddingLeft: buttonPaddingLong,
      paddingRight: buttonPaddingShort,
    },

    rightButtonContainer: {
      height: '100%',
      justifyContent: 'center',
      paddingLeft: buttonPaddingShort,
      paddingRight: buttonPaddingLong,
    },
  });
