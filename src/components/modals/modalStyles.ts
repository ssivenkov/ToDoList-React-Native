import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  contentWithBottomPadding: ViewStyle;
  contentWithoutBottomPadding: ViewStyle;
  text: TextStyle;
  contentContainer: ViewStyle;
  buttonsContainer: ViewStyle;
};

export const modalBorderRadius = 20;
const contentMaxWidth = 420;

export const modalStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.MEDIUM_DARK_TRANSPARENCY,
    },

    modalView: {
      width: contentMaxWidth,
      maxWidth: '90%',
      borderRadius: modalBorderRadius,
      paddingTop: 20,
      backgroundColor: props.MODAL_BACKGROUND_COLOR,
      overflow: 'hidden',
    },

    contentWithBottomPadding: {
      maxWidth: contentMaxWidth,
      alignItems: 'center',
      marginBottom: 16,
      marginHorizontal: 16,
    },

    contentWithoutBottomPadding: {
      maxWidth: contentMaxWidth,
      alignItems: 'center',
      marginHorizontal: 16,
    },

    text: {
      fontSize: 18,
      paddingBottom: 4,
      color: props.TEXT_COLOR,
    },

    contentContainer: {
      maxWidth: '100%',
    },

    buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
    },
  });
