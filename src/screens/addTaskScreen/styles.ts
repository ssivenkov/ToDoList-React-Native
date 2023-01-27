import { contentMaxWidth } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AddTaskScreenStylesType = {
  colorPickerSwitcherContainer: ViewStyle;
  colorPickerSwitcherText: TextStyle;
  colorPickerSwitcherWrapper: ViewStyle;
  colorPickerWrapper: ViewStyle;
  contentContainer: ViewStyle;
  contentWrapper: ViewStyle;
};

export const addTaskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<AddTaskScreenStylesType>({
    colorPickerSwitcherContainer: {
      marginTop: 14,
    },

    colorPickerSwitcherText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },

    colorPickerSwitcherWrapper: {
      overflow: 'hidden',
    },

    colorPickerWrapper: {
      height: 310,
      marginLeft: 4,
      marginTop: 25,
      paddingBottom: 90,
    },

    contentContainer: {
      maxWidth: contentMaxWidth,
      width: '100%',
    },

    contentWrapper: {
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingTop: 22,
    },
  });
