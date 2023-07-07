import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { ChangeLanguageMenuPropsType } from '@components/menus/changeLanguageMenu/types';
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
import { LanguageType } from '@store/reducers/userReducer/types';
import { useWindowDimensions } from 'react-native';

export const ChangeLanguageMenu = (props: ChangeLanguageMenuPropsType) => {
  const { changeLanguage: changeLanguageFromProps, modalCloseHandler } = props;

  const { width: appWidth } = useWindowDimensions();

  const ICON_MARGIN_LEFT_PROPORTION = 3.8;
  const ICON_MARGIN_LEFT_PROPORTION_FOR_NARROW_SCREEN = 5.8;
  const LONG_BUTTON_MODAL_CONTENT_MAX_WIDTH = 0.9;

  const iconMarginLeft =
    (modalContentMaxWidth * LONG_BUTTON_MODAL_CONTENT_MAX_WIDTH) /
    (appWidth >= modalContentMaxWidth
      ? ICON_MARGIN_LEFT_PROPORTION
      : ICON_MARGIN_LEFT_PROPORTION_FOR_NARROW_SCREEN);

  const changeLanguage = (language: LanguageType) => {
    changeLanguageFromProps(language);

    if (modalCloseHandler) modalCloseHandler();
  };

  return (
    <>
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
    </>
  );
};

export default ChangeLanguageMenu;
