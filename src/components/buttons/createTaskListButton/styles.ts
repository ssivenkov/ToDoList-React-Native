import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';

type CreateTaskListButtonStylesType = {
  icon: FontAwesomeIconStyle;
};

export const styles = StyleSheet.create<CreateTaskListButtonStylesType>({
  icon: {
    color: '#fff',
  },
});
