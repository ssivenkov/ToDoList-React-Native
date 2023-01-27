import { COLORS } from '@colors/colors';
import {
  defaultModalIndentBottom,
  defaultModalPaddingHorizontal,
  modalBorderRadius,
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
  centeredView: ViewStyle;
  childrenContainer: ViewStyle;
  descriptionContainer: ViewStyle;
  modalView: ViewStyle;
  text: TextStyle;
};

export const modalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
    },

    centeredView: {
      alignItems: 'center',
      backgroundColor: COLORS.MEDIUM_DARK_TRANSPARENCY,
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
      borderRadius: modalBorderRadius,
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
      fontSize: 18,
    },
  });
