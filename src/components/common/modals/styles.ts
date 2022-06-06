import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

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
      alignItems: 'center',
      borderRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 20,
      backgroundColor: props.BACKGROUND_COLOR,
    },

    text: {
      fontSize: 18,
      marginBottom: 12,
      color: props.TEXT_COLOR,
    },

    buttonsContainer: {
      width: '100%',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      marginTop: 12,
    },
  });
