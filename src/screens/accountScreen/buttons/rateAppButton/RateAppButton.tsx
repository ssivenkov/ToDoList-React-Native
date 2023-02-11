import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { RateAppButtonPropsType } from '@screens/accountScreen/buttons/rateAppButton/types';
import { goToGooglePlayAction } from '@store/actions/userSagaActions/goToGooglePlayAction';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

export const RateAppButton = (props: RateAppButtonPropsType) => {
  const { longButtonGradient } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const goToGooglePlay = () => {
    dispatch(goToGooglePlayAction());
  };

  return (
    <LinearGradient colors={longButtonGradient}>
      <LongButton
        icon={faStar}
        onPress={() => goToGooglePlay()}
        title={t('accountScreen.RateAppButtonTitle')}
      />
    </LinearGradient>
  );
};
