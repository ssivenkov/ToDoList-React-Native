import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DeleteTaskButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
};

const { RED } = COLORS;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DeleteTaskButtonStylesType>({
    warnText: {
      fontSize: 18,
      color: props.TEXT_COLOR,
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },
  });
