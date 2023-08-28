import { contentMaxWidth } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type EditTaskScreenStylesType = {
  colorPickerSwitcherContainer: ViewStyle;
  colorPickerSwitcherText: TextStyle;
  colorPickerSwitcherWrapper: ViewStyle;
  colorPickerWrapper: ViewStyle;
  contentContainer: ViewStyle;
  contentWrapper: ViewStyle;
  infoFieldsWrapper: ViewStyle;
};

export const editTaskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<EditTaskScreenStylesType>({
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
      height: 240,
      marginLeft: 4,
      marginTop: 25,
    },

    contentContainer: {
      maxWidth: contentMaxWidth,
      width: '100%',
    },

    contentWrapper: {
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingTop: 22,
      paddingBottom: 120,
    },

    infoFieldsWrapper: {
      marginTop: 40,
    },
  });
