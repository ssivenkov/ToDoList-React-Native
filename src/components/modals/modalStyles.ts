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
  centeredView: ViewStyle;
  modalView: ViewStyle;
  descriptionContainer: ViewStyle;
  childrenContainer: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const modalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.MEDIUM_DARK_TRANSPARENCY,
    },

    modalView: {
      width: modalContentMaxWidth,
      maxWidth: '90%',
      maxHeight:
        props.appHeight -
        (Platform.OS === 'ios'
          ? props.emulatorStatusBarHeight + iOSHeaderHeight + iOSTabBarContainerHeight
          : props.emulatorStatusBarHeight +
            androidHeaderHeight +
            androidTabBarContainerHeight),
      justifyContent: 'space-between',
      borderRadius: modalBorderRadius,
      paddingTop: 20,
      backgroundColor: props.MODAL_BACKGROUND_COLOR,
      overflow: 'hidden',
    },

    descriptionContainer: {
      maxWidth: modalContentMaxWidth,
      alignItems: 'center',
      marginHorizontal: defaultModalPaddingHorizontal,
    },

    childrenContainer: {
      maxWidth: modalContentMaxWidth,
      alignItems: 'center',
    },

    text: {
      fontSize: 18,
      marginBottom: defaultModalIndentBottom,
      color: props.TEXT_COLOR,
    },

    buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
    },
  });
