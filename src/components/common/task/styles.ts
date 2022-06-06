import {COLORS} from '@colors/colors';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
};

const {RED, COD_GRAY} = COLORS;
const textSize = 18;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskStylesType>({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 5,
      paddingVertical: 4,
      marginVertical: 3,
      borderRadius: 7,
      backgroundColor: props.TASK_COLOR,
    },

    text: {
      flex: 1,
      color: props.TEXT_COLOR,
      fontSize: textSize,
    },

    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    warnText: {
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
