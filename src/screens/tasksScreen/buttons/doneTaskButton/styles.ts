import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DoneTaskButtonStylesType = {
  warnText: TextStyle;
  greenHighlightTask: TextStyle;
};

const { JAPANESE_LAUREL } = COLORS;

export const doneTaskButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DoneTaskButtonStylesType>({
    warnText: {
      fontSize: 18,
      color: props.TEXT_COLOR,
    },

    greenHighlightTask: {
      color: JAPANESE_LAUREL,
      fontWeight: '500',
    },
  });
