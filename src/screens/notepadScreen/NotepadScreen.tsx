import React, { useState } from 'react';

import { Header } from '@components/header/Header';
import { NotepadInput } from '@components/inputs/NotepadInput';
import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { useStyles } from '@hooks/useStyles';
import { useFocusEffect } from '@react-navigation/native';
import { CleanButton } from '@screens/notepadScreen/buttons/cleanButton/CleanButton';
import { SaveButton } from '@screens/notepadScreen/buttons/saveButton/SaveButton';
import { setLastRouteAction } from '@store/actions/userReducerActions/setLastRouteAction';
import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { notepadTextSelector } from '@store/selectors/notepadSelectors';
import { lastRouteSelector, themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { notepadScreenStyles } from './styles';

export const NotepadScreen = () => {
  const dispatch = useDispatch();

  const styles = useStyles(notepadScreenStyles);

  const { t } = useTranslation();

  const lastRoute = useSelector(lastRouteSelector);
  const notepadTextFromState = useSelector(notepadTextSelector);
  const theme = useSelector(themeSelector);

  const isDarkMode = theme.darkMode;

  const [notepadText, setNotepadText] =
    useState<NotepadReducerStateType['notepadText']>(notepadTextFromState);

  useFocusEffect(() => {
    if (lastRoute !== WITH_AUTH_NAVIGATOR_ROUTE.NOTEPAD_SCREEN) {
      dispatch(
        setLastRouteAction({ lastRoute: WITH_AUTH_NAVIGATOR_ROUTE.NOTEPAD_SCREEN }),
      );
    }
  });

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
