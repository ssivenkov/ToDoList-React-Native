import React from 'react';

import { COLORS } from '@colors/colors';
import { useStyles } from '@root/hooks/useStyles';
import { View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { styles } from './styles';
import { InputPropsType } from './types';

export const NotepadInput = (props: InputPropsType) => {
  const { value, onValueChange, placeholder, inputRef } = props;

  const style = useStyles(styles);

  return (
    <View style={style.inputContainer}>
      <AutoGrowingTextInput
        enableScrollToCaret={true}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE2}
        ref={inputRef}
        style={style.notepadInput}
        value={value}
      />
    </View>
  );
};
