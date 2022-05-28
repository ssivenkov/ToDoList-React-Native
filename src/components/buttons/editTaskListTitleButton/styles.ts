import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {ThemeType} from '@store/reducers/userReducer/types';
import {StyleSheet} from 'react-native';

type EditTaskListTitleButtonStylesType = {
  icon: FontAwesomeIconStyle;
};

export const styles = (props: ThemeType) =>
  StyleSheet.create<EditTaskListTitleButtonStylesType>({
    icon: {
      color: props.ICON_BUTTON_COLOR,
    },
  });
