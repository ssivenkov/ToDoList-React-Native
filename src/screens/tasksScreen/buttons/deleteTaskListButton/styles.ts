import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DeleteTaskListButtonStylesType = {
  redHighlightTask: TextStyle;
  warnText: TextStyle;
};

const { RED } = COLORS;

export const deleteTaskListButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DeleteTaskListButtonStylesType>({
    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

    warnText: {
      color: props.TEXT_COLOR,
    },
  });
