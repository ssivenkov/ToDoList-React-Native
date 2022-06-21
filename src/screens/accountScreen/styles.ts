import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type UserScreenStylesType = {
  screenContainer: ViewStyle;
  userInfoContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  text: TextStyle;
};

const avatarSize = 100;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<UserScreenStylesType>({
    screenContainer: {
      alignItems: 'center',
      marginHorizontal: 1,
    },

    userInfoContainer: {
      marginTop: 50,
      alignItems: 'center',
      marginBottom: 30,
    },

    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: 100,
      borderWidth: 1.5,
      borderColor: props.TEXT_COLOR,
    },

    name: {
      fontSize: 22,
      fontWeight: '500',
      color: props.TEXT_COLOR,
      marginTop: 20,
      marginBottom: 5,
    },

    text: {
      fontSize: 18,
      color: props.TEXT_COLOR,
    },
  });
