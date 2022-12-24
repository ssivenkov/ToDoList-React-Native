import { RefObject } from 'react';

import { TextInput } from 'react-native';

export type InputPropsType = {
  value: string;
  onValueChange: (inputValue: string) => void;

  placeholder?: string;
  inputRef?: RefObject<TextInput>;
};
