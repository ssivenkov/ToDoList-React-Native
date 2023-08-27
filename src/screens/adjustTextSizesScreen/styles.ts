import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AdjustTextSizesScreenStylesType = {
  contentContainer: ViewStyle;
  divider: ViewStyle;
  exampleContainer: ViewStyle;
  exampleText: TextStyle;
  sliderValue: TextStyle;
  sliderValueContainer: ViewStyle;
  sliderValueSingleNumber: TextStyle;
};

export const contentContainerRatio = 0.06;

const sliderValuePaddingLeft = 15;
const sliderValueWidth = 43;
const sliderValueFullWidth = sliderValueWidth + sliderValuePaddingLeft;

const sliderValueSingleNumberPaddingLeft = 40;
const sliderValueSingleNumberWidth = 43;
const sliderValueSingleNumberFullWidth =
  sliderValueSingleNumberWidth + sliderValueSingleNumberPaddingLeft;

export const adjustTextSizesScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<AdjustTextSizesScreenStylesType>({
    exampleContainer: {
      marginBottom: 20,
    },

    exampleText: {
      color: props.TEXT_COLOR,
      fontSize: 18,
      marginBottom: 15,
    },

    divider: {
      width: '100%',
      height: 1,
      marginVertical: 35,
      backgroundColor: COLORS.DUSTY_GRAY,
    },

    contentContainer: {
      marginTop: 30,
      paddingBottom: 120,
      marginHorizontal: props.appWidth * contentContainerRatio,
    },

    sliderValueContainer: {
      marginBottom: 15,
    },

    sliderValue: {
      width: sliderValueFullWidth,
      paddingLeft: sliderValuePaddingLeft,
      fontSize: 20,
      color: props.TEXT_COLOR,
    },

    sliderValueSingleNumber: {
      width: sliderValueSingleNumberFullWidth,
      paddingLeft: sliderValueSingleNumberPaddingLeft,
      fontSize: 20,
      color: props.TEXT_COLOR,
    },
  });
