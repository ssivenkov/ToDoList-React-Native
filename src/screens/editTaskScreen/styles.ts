import { contentMaxWidth } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type EditTaskScreenStylesType = {
  contentWrapper: ViewStyle;
  colorPickerSwitcherWrapper: ViewStyle;
  colorPickerSwitcherContainer: ViewStyle;
  colorPickerSwitcherText: TextStyle;
  colorPickerWrapper: ViewStyle;
  contentContainer: ViewStyle;
};

export const editTaskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<EditTaskScreenStylesType>({
    contentWrapper: {
      alignItems: 'center',
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

    contentContainer: {
      width: '100%',
      maxWidth: contentMaxWidth,
    },
  });
