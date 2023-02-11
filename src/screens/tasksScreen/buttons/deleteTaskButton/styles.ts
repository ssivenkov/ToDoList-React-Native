import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DeleteTaskButtonStylesType = {
  redHighlightTask: TextStyle;
  warnText: TextStyle;
};

const { RED } = COLORS;

export const deleteTaskButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DeleteTaskButtonStylesType>({
    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

    warnText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
