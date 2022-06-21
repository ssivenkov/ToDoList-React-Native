import { StyleSheet, ViewStyle } from 'react-native';

type SwitcherStylesType = {
  contentDefaultContainer: ViewStyle;
};

export const styles = StyleSheet.create<SwitcherStylesType>({
  contentDefaultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
