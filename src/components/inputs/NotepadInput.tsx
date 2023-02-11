import React from 'react';

import { COLORS } from '@colors/colors';
import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { inputStyles } from './styles';
import { NotepadInputPropsType } from './types';

export const NotepadInput = (props: NotepadInputPropsType) => {
  const { value, onValueChange, placeholder } = props;

  const styles = useStyles(inputStyles);

  return (
    <View style={styles.inputContainer}>
      <AutoGrowingTextInput
        enableScrollToCaret={true}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE2}
        style={styles.notepadInput}
        value={value}
      />
    </View>
  );
};
