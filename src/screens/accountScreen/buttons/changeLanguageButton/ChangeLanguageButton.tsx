import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { ModalLongButton } from '@components/modals/ModalLongButton';
import {
  BELARUSIAN,
  BY,
  CHINESE,
  CN,
  DE,
  EN,
  ENGLISH,
  ES,
  FR,
  FRENCH,
  GERMAN,
  ID,
  INDONESIAN,
  IT,
  ITALIAN,
  JAPANESE,
  JP,
  KOREAN,
  KR,
  PL,
  POLISH,
  PORTUGUESE,
  PT,
  RU,
  RUSSIAN,
  SPANISH,
  TR,
  TURKISH,
  UA,
  UKRAINIAN,
} from '@constants/languages';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { useStyles } from '@hooks/useStyles';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import { LanguageType } from '@store/reducers/userReducer/types';
import { languageSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguageButtonStyles } from './styles';
import { ChangeLanguageButtonPropsType } from './types';

export const ChangeLanguageButton = (props: ChangeLanguageButtonPropsType) => {
  const { setIsLoading } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const styles = useStyles(changeLanguageButtonStyles);

  const language = useSelector(languageSelector);

  const changeLanguage = (language: LanguageType) => {
    dispatch(changeLanguageAction({ language, setIsLoading }));
  };

  return (
    <ModalLongButton
      buttonIcon={faLanguage}
      buttonTitle={t('accountScreen.ChangeLanguageButtonTitle')}
      description={t('accountScreen.ChangeLanguageButtonDescription')}
      hasContentBottomPadding={false}
      rightComponent={<Text style={styles.languageIndicatorText}>{language}</Text>}
    >
      <ScrollView style={styles.buttonsContainer}>
        <LongButton
          disabled={false}
          icon='🇺🇸'
          onPress={() => changeLanguage(EN)}
          title={ENGLISH}
        />
        <LongButton
          disabled={false}
          icon='🇫🇷'
          onPress={() => changeLanguage(FR)}
          title={FRENCH}
        />
        <LongButton
          disabled={false}
          icon='🇩🇪'
          onPress={() => changeLanguage(DE)}
          title={GERMAN}
        />
        <LongButton
          disabled={false}
          icon='🇮🇹'
          onPress={() => changeLanguage(IT)}
          title={ITALIAN}
        />
        <LongButton
          disabled={false}
          icon='🇵🇹'
          onPress={() => changeLanguage(PT)}
          title={PORTUGUESE}
        />
        <LongButton
          disabled={false}
          icon='🇪🇸'
          onPress={() => changeLanguage(ES)}
          title={SPANISH}
        />
        <LongButton
          disabled={false}
          icon='🇹🇷'
          onPress={() => changeLanguage(TR)}
          title={TURKISH}
        />
        <LongButton
          disabled={false}
          icon='🇵🇱'
          onPress={() => changeLanguage(PL)}
          title={POLISH}
        />
        <LongButton
          disabled={false}
          icon='🇺🇦'
          onPress={() => changeLanguage(UA)}
          title={UKRAINIAN}
        />
        <LongButton
          disabled={false}
          icon='🇧🇾'
          onPress={() => changeLanguage(BY)}
          title={BELARUSIAN}
        />
        <LongButton
          disabled={false}
          icon='🇷🇺'
          onPress={() => changeLanguage(RU)}
          title={RUSSIAN}
        />
        <LongButton
          disabled={false}
          icon='🇮🇩'
          onPress={() => changeLanguage(ID)}
          title={INDONESIAN}
        />
        <LongButton
          disabled={false}
          icon='🇨🇳'
          onPress={() => changeLanguage(CN)}
          title={CHINESE}
        />
        <LongButton
          disabled={false}
          icon='🇰🇷'
          onPress={() => changeLanguage(KR)}
          title={KOREAN}
        />
        <LongButton
          disabled={false}
          icon='🇯🇵'
          onPress={() => changeLanguage(JP)}
          title={JAPANESE}
        />
      </ScrollView>
    </ModalLongButton>
  );
};
