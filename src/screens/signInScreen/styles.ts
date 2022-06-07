import {COLORS} from '@colors/colors';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

type TasksScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
  appIcon: ImageStyle;
};

const appIconDivider = Platform.OS === 'ios' ? 2.25 : 2.4;

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
      marginBottom: 10,
      color: COLORS.WHITE,
    },

    appIcon: {
      width: props.appWidth / appIconDivider,
      height: props.appWidth / appIconDivider,
      borderRadius:
        Platform.OS === 'ios' ? props.appWidth / 18 : props.appWidth / 10,
      marginBottom: 40,
      resizeMode: 'contain',
    },
  });
