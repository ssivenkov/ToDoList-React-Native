import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, ViewStyle } from 'react-native';

type ModalStylesType = {
  buttonWrapper: ViewStyle;
  buttonsContainer: ViewStyle;
  childrenContainer: ViewStyle;
  contentContainer: ViewStyle;
  hidden: ViewStyle;
  leftButtonContainer: ViewStyle;
  menuHorizontalContainer: ViewStyle;
  middleButtonContainer: ViewStyle;
  rightButtonContainer: ViewStyle;
};

export const menuHorizontalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    buttonWrapper: {
      flex: 1,
    },

    buttonsContainer: {
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'space-between',
      position: 'absolute',
      width: '100%',
      zIndex: 100,
    },

    childrenContainer: {
      flexDirection: 'row',
      width: '100%',
    },

    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },

    hidden: {
      opacity: 0,
    },

    leftButtonContainer: {
      alignItems: 'center',
      borderRightColor: props.ICON_BUTTON_COLOR,
      borderRightWidth: 1,
      height: '100%',
      justifyContent: 'center',
    },

    menuHorizontalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },

    middleButtonContainer: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },

    rightButtonContainer: {
      alignItems: 'center',
      borderLeftColor: props.ICON_BUTTON_COLOR,
      borderLeftWidth: 1,
      height: '100%',
      justifyContent: 'center',
    },
  });
