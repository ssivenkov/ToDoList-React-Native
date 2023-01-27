import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type SwitcherStylesType = {
  contentDefaultContainer: ViewStyle;
  textBasicStyle: TextStyle;
};

export const styles = StyleSheet.create<SwitcherStylesType>({
  contentDefaultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textBasicStyle: {
    flex: 1,
  },
});
