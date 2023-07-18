import { COLORS } from '@colors/colors';
import {
  defaultModalIndentBottom,
  defaultModalPaddingHorizontal,
  modalContentMaxWidth,
} from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import {
  androidHeaderHeight,
  androidTabBarContainerHeight,
  iOSHeaderHeight,
  iOSTabBarContainerHeight,
} from '@navigation/commonNavigationStyles';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type ModalStylesType = {
  buttonsContainer: ViewStyle;
  centeredTransparentView: ViewStyle;
  centeredView: ViewStyle;
  centeredViewVisualExampleDark: ViewStyle;
  centeredViewVisualExampleLight: ViewStyle;
  childrenContainer: ViewStyle;
  descriptionContainer: ViewStyle;
  modalView: ViewStyle;
  text: TextStyle;
  textVisualExample: TextStyle;
};

const { TRANSPARENT, MEDIUM_DARK_TRANSPARENCY, EMPEROR } = COLORS;

export const modalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
    },

    centeredView: {
      alignItems: 'center',
      backgroundColor: MEDIUM_DARK_TRANSPARENCY,
      flex: 1,
      justifyContent: 'center',
    },

    centeredViewVisualExampleDark: {
      alignItems: 'center',
      backgroundColor: EMPEROR,
      paddingVertical: 10,
      flex: 1,
      justifyContent: 'center',
    },

    centeredViewVisualExampleLight: {
      alignItems: 'center',
      backgroundColor: MEDIUM_DARK_TRANSPARENCY,
      paddingVertical: 10,
      flex: 1,
      justifyContent: 'center',
    },

    centeredTransparentView: {
      alignItems: 'center',
      backgroundColor: TRANSPARENT,
      flex: 1,
      justifyContent: 'center',
    },

    childrenContainer: {
      alignItems: 'center',
      maxWidth: modalContentMaxWidth,
    },

    descriptionContainer: {
      alignItems: 'center',
      marginBottom: defaultModalIndentBottom,
      marginHorizontal: defaultModalPaddingHorizontal,
      maxWidth: modalContentMaxWidth,
    },

    modalView: {
      backgroundColor: props.MODAL_BACKGROUND_COLOR,
      borderRadius: 20,
      justifyContent: 'space-between',
      maxHeight:
        props.appHeight -
        (Platform.OS === 'ios'
          ? props.emulatorStatusBarHeight + iOSHeaderHeight + iOSTabBarContainerHeight
          : props.emulatorStatusBarHeight +
            androidHeaderHeight +
            androidTabBarContainerHeight),
      maxWidth: '90%',
      overflow: 'hidden',
      paddingTop: 20,
      width: modalContentMaxWidth,
    },

    text: {
      color: props.TEXT_COLOR,
    },

    textVisualExample: {
      color: props.TEXT_COLOR,
    },
  });
