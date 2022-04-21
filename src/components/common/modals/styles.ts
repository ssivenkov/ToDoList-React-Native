import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const {BLACK, WHITE} = COLORS;

type ModalStylesType = {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  centerContainer: ViewStyle;
  visibilityContainer: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
};

export const styles = StyleSheet.create<ModalStylesType>({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  modalView: {
    width: '90%',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    backgroundColor: WHITE,
  },

  centerContainer: {
    alignItems: 'center',
  },

  visibilityContainer: {
    opacity: 0,
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
