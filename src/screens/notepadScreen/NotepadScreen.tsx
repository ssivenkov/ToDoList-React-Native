import React, { useState } from 'react';

import { Header } from '@components/header/Header';
import { NotepadInput } from '@components/inputs/NotepadInput';
import { useStyles } from '@hooks/useStyles';
import { CleanButton } from '@screens/notepadScreen/buttons/cleanButton/CleanButton';
import { SaveButton } from '@screens/notepadScreen/buttons/saveButton/SaveButton';
import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { notepadTextSelector } from '@store/selectors/notepadSelectors';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { notepadScreenStyles } from './styles';

export const NotepadScreen = () => {
  const styles = useStyles(notepadScreenStyles);

  const { t } = useTranslation();

  const notepadTextFromState = useSelector(notepadTextSelector);
  const theme = useSelector(themeSelector);

  const isDarkMode = theme.darkMode;

  const [notepadText, setNotepadText] =
    useState<NotepadReducerStateType['notepadText']>(notepadTextFromState);

  return (
    <View
      style={
        isDarkMode ? styles.darkModeScreenContainer : styles.lightModeScreenContainer
      }
    >
      <Header
        leftButton={<CleanButton setNotepadText={setNotepadText} />}
        rightButton={<SaveButton notepadText={notepadText} />}
        title={t('notepadScreen.HeaderTitle')}
      />
      <ScrollView style={styles.scrollViewContainer}>
        <NotepadInput
          onValueChange={setNotepadText}
          placeholder={t('notepadScreen.NotepadPlaceholder')}
          value={notepadText}
        />
      </ScrollView>
    </View>
  );
};
