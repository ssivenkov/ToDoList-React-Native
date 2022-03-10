import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  modalView: {
    width: '90%',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: 20,
    color: '#000',
    marginBottom: 12,
  },

  buttonsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 13,
  },
});
