import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { tabBarContainerHeight } from '@navigation/commonNavigationStyles';
import { StyleSheet, ViewStyle } from 'react-native';

export type NotepadScreenStylesType = {
  darkModeScreenContainer: ViewStyle;
  lightModeScreenContainer: ViewStyle;
  scrollViewContainer: ViewStyle;
};

export const notepadScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<NotepadScreenStylesType>({
    darkModeScreenContainer: {
      backgroundColor: COLORS.WOODSMOKE2,
      height: '100%',
    },

    lightModeScreenContainer: {
      backgroundColor: props.BACKGROUND_COLOR,
      height: '100%',
    },

    scrollViewContainer: {
      paddingBottom: tabBarContainerHeight,
    },
  });
