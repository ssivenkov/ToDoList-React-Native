import React from 'react';

import { COLORS } from '@colors/colors';
import { NOTEPAD_LINE_HEIGHT_COMPENSATION } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { inputStyles } from './styles';
import { NotepadInputVisualExamplePropsType } from './types';

export const NotepadInputVisualExample = (props: NotepadInputVisualExamplePropsType) => {
  const { value, onValueChange, placeholder, textSize } = props;

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
        style={[
          styles.notepadInput,
          { fontSize: textSize, lineHeight: textSize + NOTEPAD_LINE_HEIGHT_COMPENSATION },
        ]}
        value={value}
      />
    </View>
  );
};
