import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  mark: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
};

const { RED, DUSTY_GRAY } = COLORS;

const textSize = 18;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskStylesType>({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingRight: 5,
      marginVertical: 3,
      overflow: 'hidden',
      borderRadius: 7,
      backgroundColor: props.TASK_COLOR,
    },

    mark: {
      height: '100%',
      width: 6,
    },

    text: {
      flex: 1,
      color: props.TEXT_COLOR,
      fontSize: textSize,
      paddingVertical: 4,
      paddingLeft: 7,
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
      color: DUSTY_GRAY,
      fontWeight: '500',
    },
  });
