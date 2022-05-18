import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const {BLACK, WHITE} = COLORS;

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const styles = StyleSheet.create<ModalStylesType>({
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
    backgroundColor: WHITE,
  },

  text: {
    fontSize: 20,
    color: BLACK,
    marginBottom: 12,
  },

  buttonsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 13,
  },
});
