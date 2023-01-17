import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { tabBarContainerHeight } from '@navigation/commonNavigationStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type NotepadScreenStylesType = {
  lightModeScreenContainer: ViewStyle;
  darkModeScreenContainer: ViewStyle;
  scrollViewContainer: ViewStyle;
};

export const notepadScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotepadScreenStylesType>({
    lightModeScreenContainer: {
      height: '100%',
      backgroundColor: props.BACKGROUND_COLOR,
    },

    darkModeScreenContainer: {
      height: '100%',
      backgroundColor: COLORS.WOODSMOKE1,
    },

    scrollViewContainer: {
      paddingBottom: tabBarContainerHeight,
    },
  });
