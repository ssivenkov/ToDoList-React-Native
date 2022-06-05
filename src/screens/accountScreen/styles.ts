import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type UserScreenStylesType = {
  screenContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  text: TextStyle;
  buttonContainer: ViewStyle;
  buttonsContainer: ViewStyle;
};

const avatarSize = 130;
const topMargin = 20;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<UserScreenStylesType>({
    screenContainer: {
      marginHorizontal: 15,
      marginVertical: 50,
      alignItems: 'center',
    },

    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: 100,
    },

    name: {
      fontSize: 30,
      fontWeight: '500',
      color: props.TEXT_COLOR,
      marginTop: topMargin,
      marginBottom: 10,
    },

    text: {
      fontSize: 22,
      color: props.TEXT_COLOR,
    },

    buttonContainer: {
      marginHorizontal: 15,
    },

    buttonsContainer: {
      width: '70%',
      flexDirection: 'row',
      marginTop: topMargin,
    },
  });
