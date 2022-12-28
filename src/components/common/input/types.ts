import { RefObject } from 'react';

import { TextInput, TextInputProps } from 'react-native';

export type InputPropsType = {
  value: string;
  onValueChange: (inputValue: string) => void;

  placeholder?: string;
  inputRef?: RefObject<TextInput>;
  subtext?: string;
  suptext?: string;
};

export type FormikInputPropsType = {
  value: string;
  onChangeText: TextInputProps['onChangeText'];

  onBlur?: TextInputProps['onBlur'];
  placeholder?: string;
  subtext?: string;
  suptext?: string;
  errorSubtext?: string;
};
