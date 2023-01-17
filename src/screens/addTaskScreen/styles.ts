import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AddTaskScreenStylesType = {
  contentContainer: ViewStyle;
  colorPickerSwitcherWrapper: ViewStyle;
  colorPickerSwitcherContainer: ViewStyle;
  colorPickerSwitcherText: TextStyle;
  colorPickerWrapper: ViewStyle;
};

export const addTaskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<AddTaskScreenStylesType>({
    contentContainer: {
      paddingHorizontal: 18,
      paddingTop: 22,
    },

    colorPickerSwitcherWrapper: {
      overflow: 'hidden',
    },

    colorPickerSwitcherContainer: {
      marginTop: 14,
    },

    colorPickerSwitcherText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },

    colorPickerWrapper: {
      marginLeft: 4,
      marginTop: 25,
      paddingBottom: 90,
      height: 270,
    },
  });
