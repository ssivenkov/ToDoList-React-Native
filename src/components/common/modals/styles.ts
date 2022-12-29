import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  contentWithBottomPadding: ViewStyle;
  contentWithoutBottomPadding: ViewStyle;
  text: TextStyle;
  contentContainer: ViewStyle;
  buttonsContainer: ViewStyle;
};

export const modalBorderRadius = 20;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.MEDIUM_TRANSPARENCY,
    },

    modalView: {
      width: '90%',
      borderRadius: modalBorderRadius,
      paddingTop: 20,
      backgroundColor: props.MODAL_BACKGROUND_COLOR,
    },

    contentWithBottomPadding: {
      alignItems: 'center',
      marginBottom: 16,
      marginHorizontal: 16,
    },

    contentWithoutBottomPadding: {
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
      maxWidth: '100%',
      flexDirection: 'row',
    },
  });
