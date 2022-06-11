import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type EditTaskButtonStylesType = {
  colorSwitcherComponentContainer: ViewStyle;
  colorSwitcherContainer: ViewStyle;
  colorSwitcherText: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<EditTaskButtonStylesType>({
    colorSwitcherComponentContainer: {
      overflow: 'hidden',
    },

    colorSwitcherContainer: {
      marginTop: 23,
    },

    colorSwitcherText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
