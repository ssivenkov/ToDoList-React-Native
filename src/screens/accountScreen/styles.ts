import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AccountScreenStylesType = {
  avatar: ImageStyle;
  name: TextStyle;
  redText: TextStyle;
  screenContainer: ViewStyle;
  text: TextStyle;
  userInfoContainer: ViewStyle;
};

const { RED } = COLORS;

const avatarSize = 100;

export const accountScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<AccountScreenStylesType>({
    avatar: {
      borderColor: props.TEXT_COLOR,
      borderRadius: 100,
      borderWidth: 1.5,
      height: avatarSize,
      width: avatarSize,
    },

    name: {
      color: props.TEXT_COLOR,
      fontSize: 22,
      fontWeight: '500',
      marginBottom: 5,
      marginTop: 20,
    },

    redText: {
      color: RED,
      fontSize: 18,
    },

    screenContainer: {
      alignItems: 'center',
      marginHorizontal: 1,
    },

    text: {
      color: props.TEXT_COLOR,
      fontSize: 18,
    },

    userInfoContainer: {
      alignItems: 'center',
      paddingBottom: 30,
      paddingTop: 50,
      width: '100%',
    },
  });
