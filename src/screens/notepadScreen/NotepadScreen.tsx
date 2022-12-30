import React, { useState } from 'react';

import { NotepadInput } from '@components/common/input/NotepadInput';
import { useStyles } from '@root/hooks/useStyles';
import { CleanButton } from '@root/screens/notepadScreen/buttons/cleanButton/CleanButton';
import { SaveButton } from '@root/screens/notepadScreen/buttons/saveButton/SaveButton';
import { styles } from '@root/screens/notepadScreen/styles';
import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { notepadTextSelector } from '@store/selectors/notepadSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const NotepadScreen = () => {
  const style = useStyles(styles);

  const { t } = useTranslation();

  const notepadTextFromState = useSelector(notepadTextSelector);

  const [notepadText, setNotepadText] =
    useState<NotepadReducerStateType['notepadText']>(notepadTextFromState);

  return (
    <ScrollView>
      <View style={style.header}>
        <View style={style.leftButtonContainer}>
          <CleanButton setNotepadText={setNotepadText} />
        </View>
        <Text style={style.headerTitle}>{t('notepadScreen.notepad')}</Text>
        <View style={style.rightButtonContainer}>
          <SaveButton notepadText={notepadText} />
        </View>
      </View>
      <NotepadInput
        onValueChange={setNotepadText}
        placeholder={t('notepadScreen.notepadPlaceholder')}
        value={notepadText}
      />
    </ScrollView>
  );
};
