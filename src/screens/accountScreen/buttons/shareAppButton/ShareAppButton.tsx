import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { ShareAppButtonPropsType } from '@screens/accountScreen/buttons/shareAppButton/types';
import { shareAppAction } from '@store/actions/userSagaActions/shareAppAction';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

export const ShareAppButton = (props: ShareAppButtonPropsType) => {
  const { longButtonGradient } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const shareApp = () => {
    dispatch(shareAppAction());
  };

  return (
    <LinearGradient colors={longButtonGradient}>
      <LongButton
        icon={faShare}
        onPress={() => shareApp()}
        title={t('accountScreen.ShareAppButtonTitle')}
      />
    </LinearGradient>
  );
};
