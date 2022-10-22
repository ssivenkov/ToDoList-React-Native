import React from 'react';

import { styles } from '@components/buttons/changeLanguageButton/styles';
import { ChangeLanguageButtonPropsType } from '@components/buttons/changeLanguageButton/types';
import { LongButton } from '@components/common/buttons/longButton/LongButton';
import { ModalLongButton } from '@components/common/modals/ModalLongButton';
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
} from '@constants/constants';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useStyles } from '@root/hooks/useStyles';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import { LanguageType } from '@store/reducers/userReducer/types';
import { languageSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

export const ChangeLanguageButton = (props: ChangeLanguageButtonPropsType) => {
  const { setIsLoading } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const style = useStyles(styles);
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
      rightComponent={<Text style={style.languageIndicatorText}>{language}</Text>}
    >
      <ScrollView style={style.buttonsContainer}>
        <LongButton
          disable={false}
          icon='🇺🇸'
          onPress={() => changeLanguage(EN)}
          title={ENGLISH}
        />
        <LongButton
          disable={false}
          icon='🇫🇷'
          onPress={() => changeLanguage(FR)}
          title={FRENCH}
        />
        <LongButton
          disable={false}
          icon='🇩🇪'
          onPress={() => changeLanguage(DE)}
          title={GERMAN}
        />
        <LongButton
          disable={false}
          icon='🇮🇹'
          onPress={() => changeLanguage(IT)}
          title={ITALIAN}
        />
        <LongButton
          disable={false}
          icon='🇵🇹'
          onPress={() => changeLanguage(PT)}
          title={PORTUGUESE}
        />
        <LongButton
          disable={false}
          icon='🇪🇸'
          onPress={() => changeLanguage(ES)}
          title={SPANISH}
        />
        <LongButton
          disable={false}
          icon='🇹🇷'
          onPress={() => changeLanguage(TR)}
          title={TURKISH}
        />
        <LongButton
          disable={false}
          icon='🇵🇱'
          onPress={() => changeLanguage(PL)}
          title={POLISH}
        />
        <LongButton
          disable={false}
          icon='🇺🇦'
          onPress={() => changeLanguage(UA)}
          title={UKRAINIAN}
        />
        <LongButton
          disable={false}
          icon='🇧🇾'
          onPress={() => changeLanguage(BY)}
          title={BELARUSIAN}
        />
        <LongButton
          disable={false}
          icon='🇷🇺'
          onPress={() => changeLanguage(RU)}
          title={RUSSIAN}
        />
        <LongButton
          disable={false}
          icon='🇮🇩'
          onPress={() => changeLanguage(ID)}
          title={INDONESIAN}
        />
        <LongButton
          disable={false}
          icon='🇨🇳'
          onPress={() => changeLanguage(CN)}
          title={CHINESE}
        />
        <LongButton
          disable={false}
          icon='🇰🇷'
          onPress={() => changeLanguage(KR)}
          title={KOREAN}
        />
        <LongButton
          disable={false}
          icon='🇯🇵'
          onPress={() => changeLanguage(JP)}
          title={JAPANESE}
        />
      </ScrollView>
    </ModalLongButton>
  );
};
