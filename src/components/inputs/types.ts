import { RefObject } from 'react';

import { infinity } from '@constants/constants';
import { TextInput, TextInputProps } from 'react-native';

export type InputPropsType = {
  onChangeText: TextInputProps['onChangeText'];
  value: string;

  displayEmptySubtext?: boolean;
  errorSubtext?: string;
  inputRef?: RefObject<TextInput>;
  maxLength?: number | typeof infinity;
  onBlur?: TextInputProps['onBlur'];
  placeholder?: string;
  subtext?: string;
  suptext?: string;
};

export type NotepadInputPropsType = {
  onValueChange: (inputValue: string) => void;
  value: string;

  placeholder?: string;
};
