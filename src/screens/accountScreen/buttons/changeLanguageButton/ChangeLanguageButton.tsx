import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { ModalLongButton } from '@components/modals/ModalLongButton';
import { modalContentMaxWidth } from '@constants/constants';
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
import { Text, useWindowDimensions } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguageButtonStyles } from './styles';
import { ChangeLanguageButtonPropsType } from './types';

export const ChangeLanguageButton = (props: ChangeLanguageButtonPropsType) => {
  const { setIsLoading } = props;

  const dispatch = useDispatch();

  const styles = useStyles(changeLanguageButtonStyles);

  const language = useSelector(languageSelector);

  const { width: appWidth } = useWindowDimensions();

  const { t } = useTranslation();

  const iconMarginLeftProportion = 3.8;
  const iconMarginLeftProportionForNarrowScreen = 5.8;
  const longButtonModalContentMaxWidth = 0.9;
  const iconMarginLeft =
    (modalContentMaxWidth * longButtonModalContentMaxWidth) /
    (appWidth >= modalContentMaxWidth
      ? iconMarginLeftProportion
      : iconMarginLeftProportionForNarrowScreen);

  const changeLanguage = (language: LanguageType) => {
    dispatch(changeLanguageAction({ language, setIsLoading }));
  };

  return (
    <ModalLongButton
      buttonIcon={faLanguage}
      buttonTitle={t('accountScreen.ChangeLanguageButtonTitle')}
      contentPaddingHorizontal={0}
      description={t('accountScreen.ChangeLanguageButtonDescription')}
      hasContentPaddingBottom={false}
      rightComponent={<Text style={styles.languageIndicator}>{language}</Text>}
    >
      <LongButton
        disabled={false}
        icon='🇺🇸'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(EN)}
        title={ENGLISH}
      />
      <LongButton
        disabled={false}
        icon='🇫🇷'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(FR)}
        title={FRENCH}
      />
      <LongButton
        disabled={false}
        icon='🇩🇪'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(DE)}
        title={GERMAN}
      />
      <LongButton
        disabled={false}
        icon='🇮🇹'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(IT)}
        title={ITALIAN}
      />
      <LongButton
        disabled={false}
        icon='🇵🇹'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(PT)}
        title={PORTUGUESE}
      />
      <LongButton
        disabled={false}
        icon='🇪🇸'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(ES)}
        title={SPANISH}
      />
      <LongButton
        disabled={false}
        icon='🇹🇷'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(TR)}
        title={TURKISH}
      />
      <LongButton
        disabled={false}
        icon='🇵🇱'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(PL)}
        title={POLISH}
      />
      <LongButton
        disabled={false}
        icon='🇺🇦'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(UA)}
        title={UKRAINIAN}
      />
      <LongButton
        disabled={false}
        icon='🇧🇾'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(BY)}
        title={BELARUSIAN}
      />
      <LongButton
        disabled={false}
        icon='🇷🇺'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(RU)}
        title={RUSSIAN}
      />
      <LongButton
        disabled={false}
        icon='🇮🇩'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(ID)}
        title={INDONESIAN}
      />
      <LongButton
        disabled={false}
        icon='🇨🇳'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(CN)}
        title={CHINESE}
      />
      <LongButton
        disabled={false}
        icon='🇰🇷'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(KR)}
        title={KOREAN}
      />
      <LongButton
        disabled={false}
        icon='🇯🇵'
        iconMarginLeft={iconMarginLeft}
        onPress={() => changeLanguage(JP)}
        title={JAPANESE}
      />
    </ModalLongButton>
  );
};
