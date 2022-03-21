import {KeyboardTypeOptions} from 'react-native';

export type InputPropsType = {
  value: string;
  onValueChange: (inputValue: string) => void;

  onBlur?: (e: any) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  placeholder?: string;
};
