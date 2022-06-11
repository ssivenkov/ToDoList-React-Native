import {styles} from '@components/buttons/changeLanguageButton/styles';
import {ChangeLanguageButtonPropsType} from '@components/buttons/changeLanguageButton/types';
import {TextButton} from '@components/common/buttons/textButton/TextButton';
import {ModalLongButton} from '@components/common/modals/ModalLongButton';
import {EN, ENGLISH, RU, RUSSIAN} from '@constants/constants';
import {faLanguage} from '@fortawesome/free-solid-svg-icons';
import {useStyles} from '@root/hooks/useStyles';
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {LanguageType} from '@store/reducers/userReducer/types';
import {languageSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';

export const ChangeLanguageButton = (props: ChangeLanguageButtonPropsType) => {
  const {setIsLoading} = props;

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const style = useStyles(styles);

  const language = useSelector(languageSelector);

  const languageIndicator = (
    <Text style={style.languageIndicatorText}>{language}</Text>
  );

  const changeLanguage = (language: LanguageType) => {
    dispatch(changeLanguageAction({language, setIsLoading}));
  };

  return (
    <ModalLongButton
      buttonIcon={faLanguage}
      description={t('accountScreen.ChangeLanguageButtonDescription')}
      buttonTitle={t('accountScreen.ChangeLanguageButtonTitle')}
      rightComponent={languageIndicator}>
      <View style={style.buttonsContainer}>
        <TextButton
          onPress={() => changeLanguage(EN)}
          title={`${ENGLISH}  🇺🇸`}
          containerStyle={style.buttonContainer}
        />
        <TextButton
          onPress={() => changeLanguage(RU)}
          title={`${RUSSIAN}  🇷🇺`}
          containerStyle={style.buttonContainer}
        />
      </View>
    </ModalLongButton>
  );
};
