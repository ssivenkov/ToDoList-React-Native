import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../colors/colors';

type CreateTaskListButtonStylesType = {
  icon: FontAwesomeIconStyle;
};

export const styles = StyleSheet.create<CreateTaskListButtonStylesType>({
  icon: {
    color: COLORS.WHITE,
  },
});
