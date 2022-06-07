import {AccentColorType} from '@store/reducers/userReducer/types';
import {ViewStyle} from 'react-native';

export type ColorPickerButtonPropsType = {
  setAccentColor: (accentColor: AccentColorType) => void;
  description: string;
  buttonTitle: string;

  containerStyle?: ViewStyle;
};
