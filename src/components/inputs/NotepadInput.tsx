import React from 'react';

import { COLORS } from '@colors/colors';
import { NOTEPAD_LINE_HEIGHT_COMPENSATION } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { notepadTextSizeSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { useSelector } from 'react-redux';

import { inputStyles } from './styles';
import { NotepadInputPropsType } from './types';

export const NotepadInput = (props: NotepadInputPropsType) => {
  const { value, onValueChange, placeholder } = props;

  const styles = useStyles(inputStyles);

  const notepadTextSize = useSelector(notepadTextSizeSelector);

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
          {
            fontSize: notepadTextSize,
            lineHeight: notepadTextSize + NOTEPAD_LINE_HEIGHT_COMPENSATION,
          },
        ]}
        value={value}
      />
    </View>
  );
};
