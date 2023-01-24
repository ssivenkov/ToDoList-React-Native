import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type SwitcherStylesType = {
  contentDefaultContainer: ViewStyle;
  textBasicStyle: TextStyle;
};

export const styles = StyleSheet.create<SwitcherStylesType>({
  contentDefaultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textBasicStyle: {
    flex: 1,
  },
});
