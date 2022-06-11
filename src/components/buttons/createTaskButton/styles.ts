import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CreateTaskButtonStylesType = {
  colorSwitcherComponentContainer: ViewStyle;
  colorSwitcherContainer: ViewStyle;
  colorSwitcherText: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<CreateTaskButtonStylesType>({
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
