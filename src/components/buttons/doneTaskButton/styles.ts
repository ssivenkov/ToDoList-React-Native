import {COLORS} from '@colors/colors';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle} from 'react-native';

type DoneTaskButtonStylesType = {
  warnText: TextStyle;
  greenHighlightTask: TextStyle;
};

const {JAPANESE_LAUREL} = COLORS;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<DoneTaskButtonStylesType>({
    warnText: {
      marginBottom: 15,
      fontSize: 20,
      color: props.TEXT_COLOR,
    },

    greenHighlightTask: {
      color: JAPANESE_LAUREL,
      fontWeight: '500',
    },
  });
