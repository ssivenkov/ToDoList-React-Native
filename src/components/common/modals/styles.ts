import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  content: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const modalBorderRadius = 20;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalStylesType>({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.85)',
    },

    modalView: {
      width: '90%',
      borderRadius: modalBorderRadius,
      paddingTop: 20,
      backgroundColor: props.BACKGROUND_COLOR,
    },

    content: {
      alignItems: 'center',
      marginHorizontal: 16,
    },

    text: {
      fontSize: 18,
      marginBottom: 12,
      color: props.TEXT_COLOR,
    },

    buttonsContainer: {
      maxWidth: '100%',
      flexDirection: 'row',
      marginTop: 20,
    },
  });
