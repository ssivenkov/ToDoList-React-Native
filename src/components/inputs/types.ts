import { RefObject } from 'react';

import { infinity } from '@constants/constants';
import { TextInput, TextInputProps } from 'react-native';

export type InputPropsType = {
  value: string;
  onChangeText: TextInputProps['onChangeText'];

  displayEmptySubtext?: boolean;
  maxLength?: number | typeof infinity;
  inputRef?: RefObject<TextInput>;
  onBlur?: TextInputProps['onBlur'];
  placeholder?: string;
  subtext?: string;
  suptext?: string;
  errorSubtext?: string;
};

export type NotepadInputPropsType = {
  value: string;
  onValueChange: (inputValue: string) => void;

  placeholder?: string;
};
