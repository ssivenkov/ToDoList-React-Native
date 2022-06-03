import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle} from 'react-native';

type DoneTaskButtonStylesType = {
  warnText: TextStyle;
  greenHighlightTask: TextStyle;
};

const {JAPANESE_LAUREL} = COLORS;

export const styles = (props: ThemeType) =>
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
