import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

type ModalStylesType = {
  menuHorizontalContainer: ViewStyle;
  contentContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  childrenContainer: ViewStyle;
  hidden: ViewStyle;
  leftButtonContainer: ViewStyle;
  middleButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
  buttonWrapper: ViewStyle;
};

export const menuHorizontalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    menuHorizontalContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },

    buttonsContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 100,
    },

    childrenContainer: {
      flexDirection: 'row',
      width: '100%',
    },

    hidden: {
      opacity: 0,
    },

    leftButtonContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 1,
      borderRightColor: props.ICON_BUTTON_COLOR,
    },

    middleButtonContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    rightButtonContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: props.ICON_BUTTON_COLOR,
    },

    buttonWrapper: {
      flex: 1,
    },
  });
