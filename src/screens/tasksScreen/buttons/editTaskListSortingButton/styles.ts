import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type EditTaskListSortingStylesType = {
  separator: ViewStyle;
  sortingContainer: ViewStyle;
  sortingLabel: TextStyle;
  sortingLabelContainer: ViewStyle;
  switcherContainer: ViewStyle;
  switcherText: TextStyle;
};

export const editTaskListSortingStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<EditTaskListSortingStylesType>({
    sortingContainer: {
      width: '100%',
      alignItems: 'stretch',
    },

    sortingLabelContainer: {
      width: '89%',
    },

    sortingLabel: {
      fontSize: 16,
      color: props.TEXT_COLOR,
    },

    separator: {
      marginVertical: 20,
      height: 1,
      backgroundColor: props.TEXT_COLOR,
    },

    switcherContainer: {
      width: '100%',
    },

    switcherText: {
      fontSize: 16,
      color: props.TEXT_COLOR,
    },
  });
