import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type InputStylesType = {
  container: ViewStyle;
  input: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<InputStylesType>({
    container: {
      flexDirection: 'row',
    },

    input: {
      width: '100%',
      alignContent: 'center',
      fontSize: 18,
      padding: 10,
      color: props.TEXT_COLOR,
      backgroundColor: props.PLACEHOLDER_COLOR,
      borderRadius: 8,
    },
  });
