import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type EditTaskButtonStylesType = {
  colorSwitcherComponentContainer: ViewStyle;
  colorSwitcherContainer: ViewStyle;
  colorSwitcherText: TextStyle;
};

export const editTaskButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<EditTaskButtonStylesType>({
    colorSwitcherComponentContainer: {
      overflow: 'hidden',
    },

    colorSwitcherContainer: {
      marginTop: 14,
    },

    colorSwitcherText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
