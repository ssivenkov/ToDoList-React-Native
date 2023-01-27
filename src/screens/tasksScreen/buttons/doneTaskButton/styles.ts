import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle } from 'react-native';

type DoneTaskButtonStylesType = {
  greenHighlightTask: TextStyle;
  warnText: TextStyle;
};

const { JAPANESE_LAUREL } = COLORS;

export const doneTaskButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DoneTaskButtonStylesType>({
    greenHighlightTask: {
      color: JAPANESE_LAUREL,
      fontWeight: '500',
    },

    warnText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },
  });
