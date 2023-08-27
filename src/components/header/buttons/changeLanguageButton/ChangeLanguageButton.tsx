import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { headerStyles } from '@components/header/styles';
import ChangeLanguageMenu from '@components/menus/changeLanguageMenu/ChangeLanguageMenu';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { useStyles } from '@hooks/useStyles';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { LanguageType } from '@store/reducers/userReducer/types';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

export const ChangeLanguageButton = () => {
  const dispatch = useDispatch();

  const headerStyle = useStyles(headerStyles);

  const { t } = useTranslation();

  const { WHITE } = COLORS;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const changeLocalLanguage = (language: LanguageType) => {
    dispatch(setLanguageAction({ language }));
  };

  const onLanguagePress = () => {
    setModalVisible(false);
  };

  return (
    <ModalIcon
      buttonIcon={
        <View style={headerStyle.rightButtonContainer}>
          <FontAwesomeIcon color={WHITE} icon={faGlobe} size={ICON_SIZE_HALF_MEDIUM} />
        </View>
      }
      description={t('accountScreen.ChangeLanguageModalTitle')}
      modalVisibleFromProps={modalVisible}
      setModalVisibleFromProps={setModalVisible}
    >
      <ChangeLanguageMenu
        changeLanguage={changeLocalLanguage}
        modalCloseHandler={onLanguagePress}
      />
    </ModalIcon>
  );
};
