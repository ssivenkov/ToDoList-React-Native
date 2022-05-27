import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const styles = (props: ThemeType) =>
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
      margin: 20,
      borderRadius: 20,
      padding: 25,
      backgroundColor: props.BACKGROUND_COLOR,
    },

    text: {
      fontSize: 20,
      marginBottom: 12,
      color: props.TEXT_COLOR,
    },

    buttonsContainer: {
      width: '100%',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      marginTop: 13,
    },
  });
