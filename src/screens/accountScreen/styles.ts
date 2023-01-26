import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AccountScreenStylesType = {
  screenContainer: ViewStyle;
  userInfoContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  text: TextStyle;
  redText: TextStyle;
};

const { RED } = COLORS;

const avatarSize = 100;

export const accountScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<AccountScreenStylesType>({
    screenContainer: {
      alignItems: 'center',
      marginHorizontal: 1,
    },

    userInfoContainer: {
      width: '100%',
      paddingTop: 50,
      alignItems: 'center',
      paddingBottom: 30,
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

    redText: {
      fontSize: 18,
      color: RED,
    },
  });
