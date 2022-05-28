import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet, TextStyle} from 'react-native';

type DoneTaskButtonStylesType = {
  warnText: TextStyle;
  icon: FontAwesomeIconStyle;
  greenHighlightTask: TextStyle;
};

const {JAPANESE_LAUREL} = COLORS;

export const styles = (props: ThemeType) =>
  StyleSheet.create<DoneTaskButtonStylesType>({
    warnText: {
      marginBottom: 15,
      fontSize: 20,
      color: props.TEXT_COLOR,
    },

    icon: {
      color: props.ICON_BUTTON_COLOR,
    },

    greenHighlightTask: {
      color: JAPANESE_LAUREL,
      fontWeight: '500',
    },
  });
