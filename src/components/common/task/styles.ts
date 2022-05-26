import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
};

const {BLACK, RED, COD_GRAY} = COLORS;
const textSize = 20;

export const styles = (props?: ThemeType) =>
  StyleSheet.create<TaskStylesType>({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 3,
      borderRadius: 7,
      backgroundColor: props?.TASK_COLOR,
    },

    text: {
      flex: 1,
      color: props?.TEXT_COLOR,
      fontSize: textSize,
    },

    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    warnText: {
      color: BLACK,
      fontSize: textSize,
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

    greenHighlightTask: {
      color: COD_GRAY,
      fontWeight: '500',
    },
  });
