import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle} from 'react-native';

type DeleteTaskButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
};

const {RED} = COLORS;

export const styles = (props: ThemeType) =>
  StyleSheet.create<DeleteTaskButtonStylesType>({
    warnText: {
      marginBottom: 15,
      fontSize: 20,
      color: props.TEXT_COLOR,
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },
  });
