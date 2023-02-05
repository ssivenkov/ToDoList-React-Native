import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type SnackBarStylesType = {
  buttonText: TextStyle;
  leftContainer: ViewStyle;
  message: TextStyle;
  middleContainer: ViewStyle;
  rightContainer: ViewStyle;
  rightContainerIconWrapper: ViewStyle;
  rightLoaderContainer: ViewStyle;
  snackBar: ViewStyle;
  snackBarWrapper: ViewStyle;
};

const { WHITE, WOODSMOKE1, PURPLE_HEART, ELECTRIC_VIOLET3 } = COLORS;

const textSize = 15;

export const snackBarStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<SnackBarStylesType>({
    snackBarWrapper: {
      position: 'absolute',
      width: '100%',
      maxWidth: props.appWidth,
      padding: 5,
      zIndex: 30,
    },

    snackBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: props.darkMode ? WOODSMOKE1 : WHITE,
      borderRadius: 10,
      width: '100%',
      maxWidth: props.appWidth,
      zIndex: 10,
      overflow: 'hidden',
    },

    leftContainer: {
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 8,
    },

    rightContainerIconWrapper: {
      marginRight: 7,
    },

    rightContainer: {
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 15,
      paddingLeft: 7,
    },

    rightLoaderContainer: {
      paddingHorizontal: 20,
    },

    middleContainer: {
      flex: 1,
      paddingVertical: 10,
    },

    message: {
      color: props.TEXT_COLOR,
      fontSize: textSize,
    },

    buttonText: {
      textTransform: 'uppercase',
      color: props.darkMode ? ELECTRIC_VIOLET3 : PURPLE_HEART,
      fontSize: textSize,
    },
  });
