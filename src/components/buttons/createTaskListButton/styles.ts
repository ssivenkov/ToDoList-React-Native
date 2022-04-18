import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';

type CreateTaskListButtonStylesType = {
  icon: FontAwesomeIconStyle;
};

const {WHITE} = COLORS;

export const styles = StyleSheet.create<CreateTaskListButtonStylesType>({
  icon: {
    color: WHITE,
  },
});
