import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TasksScreenStylesType>({
    signInWrapper: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
    },

    signInContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    screenTitle: {
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 25,
      color: props.TEXT_COLOR,
    },
  });
