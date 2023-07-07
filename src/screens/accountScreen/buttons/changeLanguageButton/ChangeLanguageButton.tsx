import React from 'react';

import ChangeLanguageMenu from '@components/menus/changeLanguageMenu/ChangeLanguageMenu';
import { ModalLongButton } from '@components/modals/ModalLongButton';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { useStyles } from '@hooks/useStyles';
import { changeLanguageAction } from '@store/actions/userSagaActions/changeLanguageAction';
import { LanguageType } from '@store/reducers/userReducer/types';
import { languageSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguageButtonStyles } from './styles';
import { ChangeLanguageButtonPropsType } from './types';

export const ChangeLanguageButton = (props: ChangeLanguageButtonPropsType) => {
  const { setIsLoading } = props;

  const dispatch = useDispatch();

  const styles = useStyles(changeLanguageButtonStyles);

  const language = useSelector(languageSelector);

  const { t } = useTranslation();

  const changeLanguage = (language: LanguageType) => {
    dispatch(changeLanguageAction({ language, setIsLoading }));
  };

  return (
    <ModalLongButton
      buttonIcon={faGlobe}
      buttonTitle={t('accountScreen.ChangeLanguageButtonTitle')}
      contentPaddingHorizontal={0}
      description={t('accountScreen.ChangeLanguageModalTitle')}
      hasContentPaddingBottom={false}
      rightComponent={<Text style={styles.languageIndicator}>{language}</Text>}
    >
      <ChangeLanguageMenu changeLanguage={changeLanguage} />
    </ModalLongButton>
  );
};
